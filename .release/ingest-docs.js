#!/usr/bin/env node
'use strict'

// Baixa o MANUAL.md de um ou mais repositórios e publica em pages/mri/resources.
//
// Serve os dois caminhos com a mesma lógica:
//   - update-doc.yml   (repository_dispatch: 1 repo por vez, incremental)
//   - sync-all-docs.yml (workflow_dispatch: o catálogo inteiro, 1 commit só)
//
// Entrada: JSON (array ou objeto único) via argv[2] ou stdin.
//   { org, repo, slug?, name?, doc_file? }
//
//   repo -> DE ONDE o arquivo é baixado
//   slug -> SOB QUAL nome a página é publicada (default: repo sem o -source)
// São diferentes por causa dos repos de fonte privada (<repo>-source).
//
// O slug é sempre saneado (ver slugify): ele é nome de arquivo e rota pública,
// e vem de um catálogo que mora em outro repositório.
//
// Flag: --prune remove as páginas que não estão no catálogo. Só o sync completo
// pode passá-la; o caminho incremental publica um repo só.

// Nota: o Nextra deste site renderiza .md como Markdown puro — chaves e sinais
// de menor vão literais para o HTML (verificado com build real). Por isso NÃO
// há saneamento de MDX aqui. Quem garante que a página renderiza é o passo de
// `pnpm build` no workflow, que roda antes do commit.

const fs = require('fs')
const path = require('path')

const RESOURCES = 'pages/mri/resources'
const META = path.join(RESOURCES, '_meta.ts')
const TOKEN = process.env.GH_TOKEN

// O slug vira nome de arquivo e, por tabela, rota pública. Ele chega do
// catálogo, que mora em outro repositório — ou seja, é entrada não confiável.
// Sem saneamento saía coisa como "Angelicxs CivilianJobs.md", que publica uma
// URL com espaço; e um slug com ".." escreveria fora de pages/.
function slugify(raw) {
    const slug = String(raw || '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w.-]/g, '')
        .replace(/-{2,}/g, '-')
        .replace(/^[-.]+|[-.]+$/g, '')

    return /^[\w][\w.-]*$/.test(slug) ? slug : null
}

// Repositório de fonte privada publica na página do recurso, não numa página
// própria — era assim que nascia o par mri_Qadmin + mri_Qadmin-source.
function defaultSlug(repo) {
    return slugify(String(repo || '').replace(/-source$/i, ''))
}

async function fetchDoc({ org, repo, doc_file }) {
    const url = `https://api.github.com/repos/${org}/${repo}/contents/${doc_file}`

    const res = await fetch(url, {
        headers: {
            Authorization: `token ${TOKEN}`,
            Accept: 'application/vnd.github.v3.raw',
            'User-Agent': 'docs-mriqbox',
        },
    })

    if (res.status === 404) return null
    if (!res.ok) throw new Error(`${org}/${repo}: HTTP ${res.status}`)

    return res.text()
}

// Lê os nomes já publicados. O _meta.ts é reescrito por inteiro no final, então
// isto serve só para não perder o nome de quem não veio neste lote.
function readNames() {
    if (!fs.existsSync(META)) return {}

    const content = fs.readFileSync(META, 'utf8')
    const names = {}

    // Só entradas string ("slug": "Nome"). A linha do index é um objeto e é
    // reemitida incondicionalmente — era justamente aí que estava o bug: o
    // script antigo só a preservava se ela já existisse, e ela havia sumido.
    const re = /^\s*"?([\w.-]+)"?\s*:\s*"([^"]+)",?\s*$/gm
    let m

    while ((m = re.exec(content)) !== null) names[m[1]] = m[2]

    return names
}

// Remove página que não está mais no catálogo. Existe porque o `_meta.ts` se
// autocorrige mas o `.md` não: quando um slug mudava (foi o caso de
// "Angelicxs CivilianJobs" -> "angelicxs-CivilianJobs"), a página antiga ficava
// no ar para sempre — fora da sidebar, mas acessível por URL e indexada pela
// busca. Só o sync completo passa --prune; o caminho incremental publica um
// repo só e apagaria todo o resto.
//
// Consequência a ter em mente: apagar o MANUAL.md de um repo (ou marcá-lo com
// publish:false no catálogo) despublica a página dele no sync seguinte. É o
// comportamento desejado, e cada remoção sai no log.
function prune(published) {
    let removed = 0

    for (const file of fs.readdirSync(RESOURCES)) {
        if (!file.endsWith('.md') || published.has(file.slice(0, -3))) continue

        fs.unlinkSync(path.join(RESOURCES, file))
        console.log(`✖ removido (fora do catálogo): ${file}`)
        removed++
    }

    return removed
}

function writeMeta(names) {
    // O _meta.ts lista apenas páginas que existem em disco. Assim ele se
    // autocorrige: ao remover um .md (ex.: o antigo mri_Qspawn-source, que era
    // publicado com o nome do repo privado), a entrada órfã some sozinha.
    const entries = Object.keys(names)
        .filter((slug) => fs.existsSync(path.join(RESOURCES, `${slug}.md`)))
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map((k) => `  "${k}": "${names[k]}",`)
        .join('\n')

    fs.writeFileSync(META, `export default {\n  "index": { display: "hidden" },\n${entries}\n}\n`)
}

async function main() {
    if (!TOKEN) {
        console.error('GH_TOKEN não definido.')
        process.exit(1)
    }

    const argv = process.argv.slice(2)
    const wantsPrune = argv.includes('--prune')
    const payload = argv.find((arg) => arg !== '--prune')

    const raw = payload || fs.readFileSync(0, 'utf8')
    const input = JSON.parse(raw)
    const items = Array.isArray(input) ? input : [input]

    fs.mkdirSync(RESOURCES, { recursive: true })

    const names = readNames()
    const published = new Set()
    const missing = []
    let written = 0
    let failed = 0

    for (const item of items) {
        const org = item.org || 'mri-Qbox-Brasil'
        const repo = item.repo
        const slug = item.slug ? slugify(item.slug) : defaultSlug(repo)
        const doc_file = item.doc_file || 'MANUAL.md'

        // Slug impublicável é erro do catálogo, não do repo. Falha alto: sem
        // isto o item some do lote em silêncio e o prune apaga a página dele.
        if (!slug) {
            console.error(`✖ ${repo}: slug inválido (${item.slug || repo})`)
            process.exitCode = 1
            failed++
            continue
        }

        const name = item.name || slug

        let doc
        try {
            doc = await fetchDoc({ org, repo, doc_file })
        } catch (err) {
            console.error(`✖ ${repo}: ${err.message}`)
            process.exitCode = 1
            failed++
            continue
        }

        // Um repo sem MANUAL.md não é erro: o catálogo cobre mais repos do que
        // já foram documentados. Avisa e segue — num lote de 100, um 404 não
        // pode derrubar os outros 99.
        if (doc === null) {
            missing.push(repo)
            continue
        }

        fs.writeFileSync(path.join(RESOURCES, `${slug}.md`), doc)
        names[slug] = name
        published.add(slug)
        written++
        console.log(`✔ ${slug}  (de ${org}/${repo})`)
    }

    // Apagar é irreversível no que o site serve, então o prune é conservador:
    // só roda no lote completo, só se algo foi publicado e só se nenhum item
    // falhou. Uma falha de rede no meio do lote não pode virar remoção em massa.
    let removed = 0
    if (wantsPrune) {
        if (!written || failed) {
            console.log(`\nprune ignorado (publicados: ${written}, falhas: ${failed}).`)
        } else {
            removed = prune(published)
        }
    }

    writeMeta(names)

    console.log(`\npublicados: ${written} | sem MANUAL.md: ${missing.length} | removidos: ${removed}`)
    if (missing.length) console.log(`sem doc: ${missing.join(', ')}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
