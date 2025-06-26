import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://juzixp.github.io'
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [//导航栏图标
      { icon: 'telegram', link: 'https://t.me/juzixp' },
      { icon: 'github', link: 'https://github.com/juzixp/OrangeTeaching' }
    ],
    search: { //搜索
      provider: 'local'
    },
    footer: { //页脚
      message: 'Released under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> License.',
      copyright: 'Copyright © 2025 <a href="https://shop.muooy.com/">桔子小铺</a> '
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      link: '/',
      title: "桔子海外技术教学",
      description: "探索无限可能，尽享全球数字内容！在这里，我们为您独家提供并持续更新各类海外苹果账号，包括备受追捧的免费美区Apple ID、日本区Apple ID，以及更多来自世界各地的区域账号。",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: '首页', link: '/' },
          { text: '用户指南', link: '/guide', activeMatch: '/guide' },
          { text: '常见问题', link: '/faq', activeMatch: '/faq' },
          { text: '教程中心', link: '/tutorials', activeMatch: '/tutorials' },
          { text: '免费账号', link: '/free-accounts', activeMatch: '/free-accounts' },
          { text: '桔子小铺', link: 'https://shop.muooy.com' },
          {
            text: '交流群',
            items: [
              { text: 'TG交流群', link: 'https://t.me/juzixpchat' },
              { text: 'TG通知频道', link: 'https://t.me/juzixp' }
            ]
          },
        ],

        sidebar: {
          '/guide/': [// 当用户位于 `guide` 目录时，会显示此侧边栏
            {
              text: '用户指南',
              items: [
                { text: 'Index', link: '/guide/' },
              ]
            }
          ],
          '/faq/': [// 当用户位于 `faq` 目录时，会显示此侧边栏
            {
              text: '常见问题',
              items: [
                { text: 'Index', link: '/faq/' },
              ]
            }
          ],
          '/tutorials/': [// 当用户位于 `faq` 目录时，会显示此侧边栏
            {
              text: '教程中心',
              items: [
                { text: 'Index', link: '/tutorials/' },
              ]
            }
          ],
          '/free-accounts/': [// 当用户位于 `faq` 目录时，会显示此侧边栏
            {
              text: '免费账户',
              items: [
                { text: 'Index', link: '/free-accounts/' },
              ]
            }
          ],
        },
        // sidebar: [
        //   {
        //     text: 'TEST',
        //     items: [
        //       { text: 'Markdown Examples', link: '/markdown-examples' },
        //       { text: 'Runtime API Examples', link: '/api-examples' }
        //     ]
        //   }
        // ],
        lastUpdatedText: '最后更新于',
        outlineTitle: '页面导航',
        docFooter: { // 中文的上一页/下一页
          prev: '上一页',
          next: '下一页'
        },
        editLink: { //编辑链接
          pattern: 'https://github.com/juzixp/OrangeTeaching/edit/main/:path',
          text: '在 GitHub 上编辑此页面'
        }
      },
    },
    en: {
      title: "Orange Teaching",
      description: "Explore endless possibilities and enjoy global digital content! Here, we exclusively provide and continuously update various overseas Apple accounts, including highly sought-after free US Apple IDs, Japanese Apple IDs, and more regional accounts from around the world.",
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'User Guide', link: '/en/guide', activeMatch: '/en/guide' },
          { text: 'FAQ', link: '/en/faq', activeMatch: '/en/faq' },
          { text: 'Tutorial Center', link: '/en/tutorials', activeMatch: '/en/tutorialsq' },
          { text: 'Free Accounts', link: '/en/free-accounts', activeMatch: '/en/free-accounts' },
          { text: "JuZi's Shop", link: 'https://shop.muooy.com' },
          {
            text: 'Community',
            items: [
              { text: 'Telegram Group', link: 'https://t.me/juzixpchat' },
              { text: 'Telegram Channel', link: 'https://t.me/juzixp' }
            ]
          }
        ],

        sidebar: [
          {
            text: 'TEST',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' }
            ]
          }
        ],
        editLink: { //编辑链接
          pattern: 'https://github.com/juzixp/OrangeTeaching/edit/main/:path',
        }
      },
    }
  }
})
