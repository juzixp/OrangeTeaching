import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "桔子海外技术教学",
  description: "探索无限可能，尽享全球数字内容！在这里，我们为您独家提供并持续更新各类海外苹果账号，包括备受追捧的免费美区Apple ID、日本区Apple ID，以及更多来自世界各地的区域账号。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '用户指南', link: '/guide' },
      { text: '常见问题', link: '/faq' },
      { text: '教程中心', link: '/posts' },
      { text: '桔子小铺', link: 'https://shop.muooy.com' },
      { text: '免费账号', link: '/free-accounts' },

    ],

    sidebar: [
      {
        text: 'TEST',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/juzixp/juzixp.github.io' }
    ]
  },
  base: '/',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://juzixp.github.io'
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
    },
    fr: {
      label: 'English',
      lang: 'en', // 可选，将作为 `lang` 属性添加到 `html` 标签中
      link: '/en/' // 默认 /fr/ -- 显示在导航栏翻译菜单上，可以是外部的

      // 其余 locale 特定属性...
    }
  }
})
