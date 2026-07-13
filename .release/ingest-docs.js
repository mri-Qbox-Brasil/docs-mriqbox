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
//   slug -> SOB QUAL nome a página é publicada (default: repo)
// São diferentes por causa dos repos de fonte privada (<repo>-source).

// Nota: o Nextra deste site renderiza .md como Markdown puro — chaves e sinais
// de menor vão literais para o HTML (verificado com build real). Por isso NÃO
// há saneamento de MDX aqui. Quem garante que a página renderiza é o passo de
// `pnpm build` no workflow, que roda antes do commit.

const fs = require('fs')
const path = require('path')

const RESOURCES = 'pages/mri/resources'
const META = path.join(RESOURCES, '_meta.ts')
const TOKEN = process.env.GH_TOKEN

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

    const raw = process.argv[2] || fs.readFileSync(0, 'utf8')
    const input = JSON.parse(raw)
    const items = Array.isArray(input) ? input : [input]

    fs.mkdirSync(RESOURCES, { recursive: true })

    const names = readNames()
    const missing = []
    let written = 0

    for (const item of items) {
        const org = item.org || 'mri-Qbox-Brasil'
        const repo = item.repo
        const slug = item.slug || repo
        const name = item.name || repo
        const doc_file = item.doc_file || 'MANUAL.md'

        let doc
        try {
            doc = await fetchDoc({ org, repo, doc_file })
        } catch (err) {
            console.error(`✖ ${repo}: ${err.message}`)
            process.exitCode = 1
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
        written++
        console.log(`✔ ${slug}  (de ${org}/${repo})`)
    }

    writeMeta(names)

    console.log(`\npublicados: ${written} | sem MANUAL.md: ${missing.length}`)
    if (missing.length) console.log(`sem doc: ${missing.join(', ')}`)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
