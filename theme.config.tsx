import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import Search from '@components/Search';

function useHead() {
  const { asPath } = useRouter();
  const { frontMatter, title } = useConfig();

  const arr = asPath.replace(/[-_]/g, ' ').split('/');
  const category = (arr[1][0] !== '#' && arr[1]) || 'mri-Qbox';
  const rawTitle = arr[arr.length - 1];
  const pageTitle = /[a-z]/.test(rawTitle) && /[A-Z]/.test(rawTitle) ? rawTitle : title;
  const fullTitle = `${pageTitle} - ${
    rawTitle === category
      ? 'Documentação'
      : category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
  }`;

  const url = `https://docs.mriqbox.com.br${asPath}`;
  const description = frontMatter.description || "Documentação para os recursos desenvolvidos pela mri-Qbox.";

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="/static/mri.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700;800&display=swap"
      />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content={description} />
      <meta name="og:title" content={fullTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
    </>
  );
}

const config: DocsThemeConfig = {
  logo: (
    <div
      style={{
        paddingLeft: '50px',
        lineHeight: '38px',
        background: "url('https://avatars.githubusercontent.com/u/164149697?s=96&v=4') no-repeat left",
        backgroundSize: '38px',
        fontWeight: 550,
      }}
    >
      MRI QBOX BRASIL
    </div>
  ),
  project: {
    link: 'https://github.com/mri-Qbox-Brasil',
  },
  chat: {
    link: 'https://discord.mriqbox.com.br',
  },
  docsRepositoryBase: 'https://github.com/mri-Qbox-Brasil/docs-mriqbox/blob/main',
  footer: {
    content: 'Copyright © 2026 MRI QBOX BRASIL. Todos os direitos reservados.',
  },
  search: {
    component: <Search />,
  },
  head: useHead,
  color: {
    hue: { dark: 160, light: 160 },
    saturation: { dark: 100, light: 100 },
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  },
};

export default config;
