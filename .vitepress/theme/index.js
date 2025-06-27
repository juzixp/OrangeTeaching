import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 引入 Element Plus 的基础样式

//export default DefaultTheme

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 全局注册 Element Plus
        app.use(ElementPlus)
    }
}