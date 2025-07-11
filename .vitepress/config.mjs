import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    server: {
      proxy: {
        '/api/go-rod': {
          target: 'https://free.iosapp.icu',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/go-rod/, '')
        }
      }
    }
  },
  base: '/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js' }
    ],
    [
      'script',
      {},
      `LA.init({id:"KrUrLpURiEcV0A1f",ck:"KrUrLpURiEcV0A1f",autoTrack:true,hashMode:true})`
    ],
    [
      'script',
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "s7k2chzkbz");`
    ]
  ],
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.applexp.com'
  },
  themeConfig: {
    logo: '/logo.png',
    socialLinks: [//导航栏图标
      { icon: 'telegram', link: 'https://t.me/juzihenku' },
      { icon: 'maildotru', link: 'mailto:main@gog.email' },
      // { icon: 'github', link: 'https://github.com/juzixp/OrangeTeaching' }
    ],
    search: { //搜索
      provider: 'local'
    },
    footer: { //页脚
      message: 'Released under the <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> License.',
      copyright: 'Copyright © 2025 <a href="https://docs.applexp.com">果学坊</a> | 联系我：<a href="https://t.me/juzihenku" target="_blank" rel="noopener">@juzihenku</a>'
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      link: '/',
      title: "果学坊",
      description: "果学坊 — 探索无限可能，尽享全球数字内容！我们为您提供最新、最全的海外数字服务操作指南，涵盖美区/日本区Apple ID注册与使用技巧、热门应用解锁教程，以及更多国际平台的功能探索秘籍。本站倡导合法合规使用，严禁将所学知识用于任何违法或侵权行为。",
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          { text: '首页', link: '/' },
          { text: '用户指南', link: '/guide/', activeMatch: '/guide' },
          { text: '常见问题', link: '/faq/', activeMatch: '/faq' },
          { text: '教程中心', link: '/tutorials/', activeMatch: '/tutorials' },
          { text: '免费账号', link: '/free-accounts/', activeMatch: '/free-accounts' },
          { text: '桔子小铺', link: 'https://shop.muooy.com' },
          {
            text: '交流群',
            items: [
              { text: 'TG交流群', link: 'https://t.me/+N2S9K9tXyUlmODI0' },
              { text: 'TG通知频道', link: 'https://t.me/juzixp' }
            ]
          },
        ],

        sidebar: {
          '/guide/': getGuideSidebarZhCN(),
          '/faq/': getFaqSidebarZhCN(),
          '/tutorials/': getTutorialsSidebarZhCN(),
          '/free-accounts/': getFreeAccountsSidebarZhCN(),
        },
        lastUpdatedText: '最后更新于',
        outlineTitle: '页面导航',
        docFooter: { // 中文的上一页/下一页
          prev: '上一页',
          next: '下一页'
        },
        returnToTopLabel: '返回顶部',
        langMenuLabel: '语言',
        sidebarMenuLabel: '菜单',
        darkModeSwitchTitle: '深色模式切换',
        lightModeSwitchTitle: '浅色模式切换',

        // editLink: { //编辑链接
        //   pattern: 'https://github.com/juzixp/OrangeTeaching/edit/main/:path',
        //   text: '在 GitHub 上编辑此页面'
        // }
      },
    },
    en: {
      title: "FruitPie Tech",
      description: "Unlock global digital content and explore endless possibilities with PlayGool! We provide the latest and most comprehensive guides for overseas digital services, covering registration and usage tips for US/Japan Apple IDs, popular app unlocking tutorials, and exclusive insights into international platforms. This site advocates for legal and compliant use. Strictly prohibited use for any illegal or infringing activities.",
      label: 'English',
      lang: 'en',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'User Guide', link: '/en/guide/', activeMatch: '/en/guide' },
          { text: 'FAQ', link: '/en/faq/', activeMatch: '/en/faq' },
          { text: 'Tutorial Center', link: '/en/tutorials/', activeMatch: '/en/tutorialsq' },
          { text: 'Free Accounts', link: '/en/free-accounts/', activeMatch: '/en/free-accounts' },
          { text: "JuZi's Shop", link: 'https://shop.muooy.com' },
          {
            text: 'Community',
            items: [
              { text: 'Telegram Group', link: 'https://t.me/juzixpchat' },
              { text: 'Telegram Channel', link: 'https://t.me/juzixp' }
            ]
          }
        ],

        sidebar: {
          '/en/guide/': getGuideSidebarEnUs(),
          '/en/faq/': getFaqSidebarEnUs(),
          '/en/tutorials/': getTutorialsSidebarEnUs(),
          '/en/free-accounts/': getFreeAccountsSidebarEnUs(),

        },
        // editLink: { //编辑链接
        //   pattern: 'https://github.com/juzixp/OrangeTeaching/edit/main/:path',
        // }
      },
    }
  }
})


// 中文侧边栏
function getGuideSidebarZhCN() {
  return [
    {
      text: 'Apple 指南',
      items: [
        { text: '如何登录App Store使用', link: '/guide/login-app-store', },
        { text: '苹果账号邮箱/密码/安全问题修改方法', link: '/guide/AppleIdUpdate' },
        { text: '苹果共享账户登录App Store步骤', link: '/guide/apple-shared-id-login-app-store' },
        { text: '苹果Apple ID关闭双重认证方法', link: '/guide/apple-id-turn-off-2fa' },
        { text: '如何将Apple ID付款方式设为 “无”', link: '/guide/apple-id-payment-none' }
      ],
      collapsed: false,
    },
    {
      text: 'ChatGPT 指南',
      items: [
        { text: '待更新', link: '#', },
      ],
      collapsed: false,
    }
  ]
}
function getFaqSidebarZhCN() {
  return [
    {
      text: 'AppleID 常见问题',
      items: [
        { text: 'Apple ID 常见问题汇总', link: '/faq/apple-id-faq' },
      ],
      collapsed: false,
    }
  ]
}

function getTutorialsSidebarZhCN() {
  return [
    {
      text: '教程中心',
      items: [
        { text: '待更新', link: '#' },
      ],
      collapsed: false,
    }
  ]
}
function getFreeAccountsSidebarZhCN() {
  return [
    {
      text: '苹果共享账户',
      items: [
        { text: '美区AppleID账户免费共享', link: '/free-accounts/appleid-us' },
        { text: '苹果已购Shadowrocket小火箭共享账户', link: '/free-accounts/Shadowrocket' },
        { text: '日本AppleID账户免费共享', link: '/free-accounts/appleid-jp' },
        { text: '香港AppleID账户免费共享', link: '/free-accounts/appleid-hk' },
      ],
      collapsed: false,
    },
    {
      text: 'ChatGPT共享账户',
      items: [
        { text: '免费ChatGPT共享账号', link: '/free-accounts/chatgpt' },
      ],
      collapsed: false,
    }
  ]
}


// 英文侧边栏


function getGuideSidebarEnUs() {
  return [
    {
      text: 'Apple Guides',
      items: [
        {
          text: 'How to log in to the App Store', link: '/en/guide/login-app-store',
        },
        { text: 'How to modify Apple ID email/password/security questions', link: '/en/guide/AppleIdUpdate' }
      ]
    },
    {
      text: 'ChatGPT Guides',
      items: [

      ]
    }
  ]
}
function getFaqSidebarEnUs() {
  return [
    {
      text: 'FAQ',
      items: [
        { text: 'Index', link: '/en/' },
      ]
    }
  ]
}

function getTutorialsSidebarEnUs() {
  return [
    {
      text: 'Tutorial Center',
      items: [
        { text: 'Index', link: '/en/' },
      ]
    }
  ]
}
function getFreeAccountsSidebarEnUs() {
  return [
    {
      text: 'Apple Apple ID Accounts',
      items: [
        { text: 'Free Shared US Apple ID Accounts', link: '/en/free-accounts/appleid-us' },
        { text: 'Shared Apple ID Account with Shadowrocket Purchased', link: '/en/free-accounts/Shadowrocket' },
      ]
    }
  ]
}