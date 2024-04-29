import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { version } from '../../package.json'

const ogUrl = '//'
const ogImage = `${ogUrl}og.png#1`
const title = 'ElemFormily'
const description = '使用 Element Plus 结合 Formily 的 UI 框架'

const Guides: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
]

const Nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    items: [
      {
        text: 'Guide',
        items: Guides,
      },
    ],
    activeMatch: '^/guide/',
  },
  {
    text: 'Docs',
    items: [
      { text: 'Element Plus', link: 'https://element-plus.org/zh-CN', target: '_blank' },
      { text: 'Alibaba Formily', link: 'https://formilyjs.org/zh-CN', target: '_blank' },
    ],
  },
  { text: 'Playground', link: 'https://element-plus.run', target: '_blank' },
  {
    text: `v${version}`,
    items: [
      {
        text: 'Release Notes',
        link: 'https://github.com/wen403/nigi-element-plus/releases',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/unocss/nigi-element-plus/blob/main/CONTRIBUTING.md',
      },
    ],
  },
]

const SidebarGuide: DefaultTheme.SidebarItem[] = [
  {
    text: 'Guides',
    items: Guides,
  },
]

export default defineConfig({
  lang: 'en-US',
  title,
  titleTemplate: title,
  description,
  outDir: './dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico', type: 'image/png', sizes: '16x16' }],
    ['meta', { name: 'author', content: 'Anthony Fu' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: title }],
    ['meta', { name: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:site', content: '@antfu7' }],
    ['meta', { name: 'twitter:url', content: ogUrl }],
    ['link', { rel: 'search', type: 'application/opensearchdescription+xml', href: '/search.xml', title: 'UnoCSS' }],
  ],
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/play/,
    /^\/interactive/,
    /:\/\/localhost/,
  ],

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    codeTransformers: [
      transformerTwoslash({
        processHoverInfo: info => info.replace(/_unocss_core\./g, ''),
      }),
    ],
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: Nav,
    search: {
      provider: 'local',
    },
    sidebar: {
      '/guide/': SidebarGuide,
    },
    editLink: {
      pattern: 'https://github.com/unocss/unocss/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wen403/nigi-element-plus' },
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2023-2024 nigi wen',
    },
  },
})
