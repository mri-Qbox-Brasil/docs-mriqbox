# 📚 mri-Qbox - Documentação do Projeto

> **Central de documentação da comunidade MRI Qbox Brasil** - Guias, tutoriais, e referências para recursos FiveM baseados em Qbox.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Nextra](https://img.shields.io/badge/Nextra-2.13-blue?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![MRI Qbox](https://img.shields.io/badge/MRI%20Qbox-Brasil-blue?style=flat-square)

---

## 📋 Table of Contents

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Desenvolvimento Local](#-desenvolvimento-local)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Customizados](#-componentes-customizados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Recursos Documentados](#-recursos-documentados)
- [Configuração](#-configuração)
- [Deploy](#-deploy)
- [Contribuição](#-contribuição)

---

## 🎯 Visão Geral

A **docs-mriqbox** é a documentação oficial da comunidade MRI Qbox Brasil. Ela fornece guias completos, referências de API, e tutoriais para desenvolvedores criando recursos para servidores FiveM baseados na framework Qbox.

### ✨ Destaques

| Feature | Descrição |
|---------|-------------|
| 📖 **Documentação Completa** | Guias, tutoriais e referências |
| 🎨 **UI Moderna** | Estilizada com Tailwind CSS |
| 🔍 **Busca Integrativa** | DocSearch (Algolia) |
| 📱 **Design Responsivo** | Mobile-first |
| 🌐 **Deploy Automático** | Vercel integration |
| 🎭 **Componentes React** | Tabelas, botões, busca customizada |
| 📊 **Tabelas Colapsáveis** | Para listagem de recursos |

---

## 🛠️ Tecnologias

### Core

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | ^14.2.32 | Framework React |
| **Nextra** | ^2.13.4 | Documentation framework |
| **Nextra Docs Theme** | ^2.13.4 | Documentation theme |
| **React** | ^18.3.1 | UI library |
| **TypeScript** | ^4.9.5 | Type safety |

### Styling & UI

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| **Tailwind CSS** | ^3.4.4 | Utility-first CSS |
| **Autoprefixer** | ^10.4.19 | CSS autoprefixer |
| **PostCSS** | ^8.4.38 | CSS transformations |
| **@tabler/icons-react** | ^2.47.0 | Icon set |
| **prettier-plugin-tailwindcss** | ^0.3.0 | Formatter |

### Search

| Pacote | Versão | Propósito |
|--------|--------|-----------|
| **@docsearch/css** | ^3.6.0 | DocSearch styles |
| **@docsearch/react** | ^3.6.0 | DocSearch component |
| **next-sitemap** | ^4.2.3 | Sitemap generator |

---

## 🚀 Desenvolvimento Local

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

### Início Rápido

```bash
# Instalar dependências
pnpm i

# Iniciar servidor de desenvolvimento
pnpm dev
```

Acesse `http://localhost:3000` para ver a documentação.

### Scripts Disponíveis

| Script | Comando | Descrição |
|--------|---------|-------------|
| **Dev** | `pnpm dev` | Inicia servidor Next.js em modo dev |
| **Build** | `pnpm build` | Gera build de produção |
| **Start** | `pnpm start` | Inicia servidor Next.js de produção |
| **Post-build** | `pnpm postbuild` | Gera sitemap (`next-sitemap`) |

---

## 📁 Estrutura do Projeto

```
docs-mriqbox/
├── pages/                       # Páginas da documentação (MDX)
│   ├── _app.mdx                 # App wrapper
│   ├── _meta.json               # Configuração de navegação
│   ├── qbox.mdx                 # Página principal Qbox
│   └── ...                      # Outras páginas
├── components/                   # Componentes React customizados
│   ├── Button.tsx               # Componente de botão
│   ├── Search.tsx               # Busca customizada
│   ├── CollapsibleTable.tsx     # Tabela expansível
│   ├── Contributors.tsx         # Lista de contribuidores
│   ├── ContributorLink.tsx      # Link de contribuidor
│   ├── CreatorCodes.tsx         # Códigos de criadores
│   ├── CreatorCode.tsx          # Código individual
│   └── resource-links.tsx        # Links de recursos
├── public/                       # Arquivos estáticos
│   ├── static/
│   │   ├── images/              # Imagens (screenshots, etc.)
│   │   ├── gif/                 # GIFs demonstrativos
│   │   └── mri.ico              # Favicon
│   └── CNAME                    # Domínio customizado
├── theme.config.tsx              # Configuração do tema Nextra
├── next.config.js                # Configuração Next.js
├── tailwind.config.js            # Configuração Tailwind
├── tsconfig.json                 # Configuração TypeScript
├── package.json                  # Dependências
├── pnpm-lock.yaml                # Lock file
├── repos.json                    # Lista de repositórios da org
├── patches/                      # Patches de dependências
│   └── nextra@2.13.4.patch
├── .next/                        # Build output (não versionar)
└── README.md
```

---

## 🧩 Componentes Customizados

### Componentes React

| Componente | Arquivo | Descrição |
|------------|---------|-------------|
| **Button** | `components/button.tsx` | Botão estilizado |
| **Search** | `components/Search.tsx` | Campo de busca customizado |
| **CollapsibleTable** | `components/CollapsibleTable.tsx` | Tabela expansível para dados |
| **Contributors** | `components/Contributors.tsx` | Grid de contribuidores |
| **ContributorLink** | `components/ContributorLink.tsx` | Link individual |
| **CreatorCodes** | `components/CreatorCodes.tsx` | Lista de códigos de criadores |
| **resource-links** | `components/resource-links.tsx` | Links para recursos GitHub |

### Exemplo: CollapsibleTable

```tsx
// components/CollapsibleTable.tsx
import { useState } from 'react';

export function CollapsibleTable({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-table">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Ocultar' : 'Mostrar'} detalhes
      </button>
      {isOpen && (
        <table>
          {/* Table content */}
        </table>
      )}
    </div>
  );
}
```

---

## 📦 Package.json

```json
{
  "name": "nextra-docs-template",
  "version": "0.0.1",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postbuild": "next-sitemap"
  },
  "dependencies": {
    "@docsearch/css": "^3.6.0",
    "@docsearch/react": "^3.6.0",
    "@tabler/icons-react": "^2.47.0",
    "next": "^14.2.32",
    "next-sitemap": "^4.2.3",
    "nextra": "^2.13.4",
    "nextra-docs-template": "file:",
    "nextra-theme-docs": "^2.13.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "18.11.10",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "prettier-plugin-tailwindcss": "^0.3.0",
    "tailwindcss": "^3.4.4",
    "typescript": "^4.9.5"
  },
  "pnpm": {
    "patchedDependencies": {
      "nextra@2.13.4": "patches/nextra@2.13.4.patch"
    }
  }
}
```

---

## 📖 Recursos Documentados

### Estrutura de Páginas

| Categoria | Exemplos | Seções |
|-----------|----------|--------|
| **Qbox Core** | `qbx_core`, `qbx_vehicles` | Types, Exports, Events |
| **Jobs** | `qbx_mechanicjob`, `qbx_towjob` | Config, Commands |
| **UI** | `qbx_hud`, `qbx_radialmenu` | Components, Exports |
| **Items** | `qbx_smallresources` | Usage, Crafting |
| **World** | `qbx_interior`, `qbx_garages` | Configuration |

### Exemplo de Página MDX

```mdx
# qbx_core

> **Core framework for Qbox** - Provides player data, jobs, gangs, and core events.

---

## Types

### Player

\```typescript
interface Player {
  source: number;
  identifier: string;
  name: string;
  job: Job;
  gang: Gang;
}
\```

## Exports

### Server Exports

| Export | Description |
|--------|-------------|
| `GetPlayer(source)` | Get player object |
| `SetJob(source, job, grade)` | Set player job |

## Events

### Client Events

| Event | Description |
|-------|-------------|
| `qbx_core:client:playerLoaded` | Triggered when player loads |
```

---

## ⚙️ Configuração

### theme.config.tsx

```tsx
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span style={{ color: '#4A90E2' }}>mri-Qbox Docs</span>,
  project: {
    link: 'https://github.com/mri-Qbox-Brasil/docs-mriqbox'
  },
  docsRepositoryBase: 'https://github.com/mri-Qbox-Brasil/docs-mriqbox',
  footer: {
    text: 'MIT License | © MRI Qbox Brasil'
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/static/mri.ico" />
    </>
  )
};

export default config;
```

### next.config.js

```javascript
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
});

module.exports = withNextra({
  reactStrictMode: true,
  images: {
    domains: ['assets.mriqbox.com.br']
  }
});
```

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte o repositório no [Vercel](https://vercel.com/)
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push na `main`

### Build Manual

```bash
pnpm build
pnpm start
```

---

## 🤝 Contribuição

### Como contribuir

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/nova-doc`)
3. Adicione/atualize documentação
4. Commit (`git commit -m 'docs: adiciona doc para novo recurso'`)
5. Push (`git push origin feature/nova-doc`)
6. Abra um Pull Request

### Padrão de Documentação

| Seção | Obrigatório | Descrição |
|-------|-------------|-------------|
| **Título** | ✅ | Nome do recurso |
| **Descrição** | ✅ | Breve resumo |
| **Exports** | Se houver | Tabela de exports |
| **Events** | Se houver | Tabela de eventos |
| **Exemplos** | Recomendado | Código de exemplo |

---

## 📊 Estatísticas

- 📖 **Páginas de Docs**: 30+
- 🎮 **Recursos Documentados**: 80+
- 🧩 **Componentes React**: 8
- 🖼️ **Imagens/GIFs**: 50+

---

## 🔗 Links

- 🌐 **Live Site**: https://docs-mriqbox.vercel.app/
- 🐙 **GitHub**: https://github.com/mri-Qbox-Brasil/docs-mriqbox
- 💬 **Discord**: https://discord.gg/uEfGD4mmVh
- 📚 **Qbox Docs**: https://docs.qbox.re/

---

## 🙏 Agradecimentos

- [`shuding/nextra-docs-template`](https://github.com/shuding/nextra-docs-template) - O template base
- [`overextended/overextended.github.io`](https://github.com/overextended/overextended.github.io) - 99.9% da estilização veio daqui
- [`vercel/next.js`](https://github.com/vercel/next.js) - O framework React
- Comunidade MRI Qbox Brasil 🇧🇷

---

## 📄 Licença

MIT License

---

<p align="center">
  <i>Documentação da comunidade MRI Qbox Brasil 🇧🇷</i>
</p>
