# Manual do docs-mriqbox

## Visão Geral
Central de documentação da comunidade **MRI Qbox Brasil**, construída com Next.js, Nextra e Tailwind CSS, hospedada na Vercel. Fornece guias, tutoriais e referências para recursos FiveM baseados em Qbox, com foco na comunidade brasileira.

## Funcionalidades
- **Documentação de Recursos**: 80+ recursos documentados (Qbox core, scripts MRI, OX ecosystem).
- **Componentes React Customizados**: Tabelas colapsáveis, busca personalizada, lista de contribuidores.
- **Busca Avançada**: Integração com DocSearch (Algolia) para pesquisa em tempo real.
- **Design Responsivo**: Estilizado com Tailwind CSS, mobile-first.
- **Deploy Automático**: Atualizações via Vercel a cada push na branch `main`.
- **Sitemap Automático**: Gerado via `next-sitemap` após o build.

## Como Funciona
- Páginas em **MDX** no diretório `pages/` usam componentes React customizados (ex: `CollapsibleTable` para listar exports/events).
- O arquivo `repos.json` lista repositórios da organização para integração dinâmica.
- A busca é alimentada pelo DocSearch, indexando todo o conteúdo da documentação.

## Configuração
### Arquivos Principais
- `theme.config.tsx`: Configuração do tema Nextra (logo, links, favicon).
- `next.config.js`: Configurações do Next.js (domínios de imagem: `assets.mriqbox.com.br`).
- `tailwind.config.js`: Personalização do Tailwind CSS.

### Desenvolvimento Local
```bash
pnpm install  # Instala Next.js, Nextra, Tailwind e DocSearch
pnpm dev      # Servidor local em localhost:3000
pnpm build    # Gera build de produção
pnpm postbuild # Gera sitemap via next-sitemap
```

## Componentes Customizados
| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| `CollapsibleTable` | `components/CollapsibleTable.tsx` | Tabela expansível para listar exports/events |
| `Search` | `components/Search.tsx` | Campo de busca personalizado |
| `Contributors` | `components/Contributors.tsx` | Grid de contribuidores da organização |

## Casos de Uso
- Desenvolvedores brasileiros consultarem documentação de recursos Qbox em português.
- Aprenderem a integrar scripts MRI com a framework Qbox.
- Buscarem exemplos de código e configurações de recursos.

## Solução de Problemas
- **Componente não renderiza**: Valide se o componente React está importado corretamente na página MDX.
- **Busca não retorna resultados**: Verifique a configuração do DocSearch e se o conteúdo foi indexado.
- **Erro de build**: Confirme que o Node.js 18+ e o pnpm estão instalados corretamente.
