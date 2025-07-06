# 常见问题导航目录
---

定期更新苹果AppleID、ChatGPT，Google，以及有关桔子小铺的一些商品常见问题。

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue' // 引入 computed 用于创建响应式属性

const { theme, page } = useData()

// 假设我们现在固定查找包含 'guide' 的侧边栏部分
const guideSidebarItems = computed(() => {
  if (!theme.value.sidebar) return [];

  // 1. 如果你在根语言环境的 index.md
  if (theme.value.sidebar['/faq/']) {
    return theme.value.sidebar['/faq/'];
  }

  // 2. 如果你在某个具体语言环境的 index.md (例如 /zh-CN/index.md)
  const currentLang = page.lang; // Use page.lang directly, it's like 'zh-CN'
  const langSpecificGuidePath = `/${currentLang}/faq/`;
  if (theme.value.sidebar[langSpecificGuidePath]) {
    return theme.value.sidebar[langSpecificGuidePath];
  }

  return [];
});

// 辅助函数：渲染侧边栏项目
// 这个函数现在更复杂，因为它需要区分渲染有序列表还是无序列表的子项
const renderList = (items, isOrdered = true) => {
  if (!items || items.length === 0) return '';
  
  const listTag = isOrdered ? 'ol' : 'ul';
  let html = `<${listTag}>`;
  
  items.forEach(item => {
    html += '<li>';
    if (item.text) {
      if (item.link) {
        html += `<a href="${item.link}">${item.text}</a>`;
      } else {
        html += `<strong>${item.text}</strong>`; // 分组标题加粗
      }
    }
    
    if (item.items && item.items.length > 0) {
      // 递归渲染子项时，总是使用无序列表 (false)
      html += renderList(item.items, false); 
    }
    html += '</li>';
  });
  html += `</${listTag}>`;
  return html;
};

</script>

<style scoped>
/* 可选：为列表添加一些样式 */
ol {
  margin-left: 20px;
  line-height: 1.6;
}
ul {
  list-style: disc; /* 默认圆形点 */
  margin-left: 30px; /* 增加缩进，使子列表与父列表区分开 */
  line-height: 1.6;
}
ul ul { /* 嵌套的无序列表 */
  list-style: circle; /* 第二层无序列表使用空心圆 */
  margin-left: 20px;
}
a {
  text-decoration: none;
  color: var(--vp-c-brand-1); /* VitePress主题色 */
}
a:hover {
  text-decoration: underline;
}
strong {
    color: var(--vp-c-text-1); /* 分组标题颜色 */
}
</style>

<div v-if="guideSidebarItems && guideSidebarItems.length > 0">
  <!-- 初始调用 renderList 时，指定使用有序列表 (true) -->
  <div v-html="renderList(guideSidebarItems, true)"></div>
</div>
<div v-else>
  <p>未找到相关内容。</p>
</div>