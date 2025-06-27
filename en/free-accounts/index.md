# Free Accounts
---

### Disclaimer & Terms of Use
> [!WARNING]
> **Strictly prohibited for any illegal or unauthorized use!** The **free shared accounts** provided by this website are for learning, testing and temporary use only. It is strictly prohibited to use them for disseminating or storing any illegal or non-compliant content, including but not limited to:
>
> 1. Illegal information such as pornography, violence, gambling, terrorism, etc.
> 2. Content that infringes on others' intellectual property rights, privacy rights, reputation rights and other legitimate rights and interests.
> 3. Criminal activities such as fraud, money laundering, cyber attacks, etc.
> 4. Any behavior that violates national laws, regulations and social public order.
>
> **By using the shared accounts provided by this site, you acknowledge that you have read and agreed to all the following terms and promise to comply with relevant laws and regulations.** Any violation of the above provisions or engagement in illegal activities will be solely borne by the user, and this website will actively cooperate with relevant authorities in investigation and handling.

> [!IMPORTANT]
>
> #### Risk Warning:
>
> - **Legal Risks:** The act of sharing accounts itself may violate the original service provider's user agreement, leading to account suspension or legal disputes such as intellectual property infringement and unfair competition. If you use shared accounts for illegal activities, you may face administrative penalties or even criminal liability.
> - **Privacy & Security Risks:** Shared accounts may increase the risk of your personal information leakage, including but not limited to personal data, browsing history, payment information, etc. Criminals may exploit vulnerabilities in shared accounts for account theft, fraudulent transactions, telecom fraud, or even obtain your sensitive information through features like "screen sharing".
> - **Account Suspension Risk:** Most service providers prohibit account sharing in their user agreements. Once the platform detects sharing behavior, the account may be warned, have certain functions restricted, or even permanently suspended, making you unable to continue using related services.
> - **Device Security Risk:** Shared accounts from unknown sources may contain malware or viruses, threatening your device security.
> - **Usage Instability Risk:** Shared accounts may experience frequent disconnections or "account kicking" due to multiple users, affecting your normal usage experience.
> 
> #### Usage Recommendations (Risk Reduction):
> 
> - **Do NOT bind any personal privacy information or payment methods to shared accounts!** Including but not limited to bank cards, ID information, phone numbers, etc.
> - **Never log in to cloud services or sync features involving personal privacy with shared accounts!** (e.g. iCloud, One Drive, etc.).
> - Do not attempt to change the password, security questions or any other registration information of shared accounts to avoid account locking or affecting other users.
> - Log out promptly after use.
> - If possible, we strongly recommend registering and using your own exclusive account to maximize your data security and usage stability.
> 
> #### Disclaimer:
> 
> - This website only provides account sharing services for user communication and testing purposes, not for profit.
> - This website shall not be liable for any personal information leakage, property loss, legal disputes or any other consequences caused by users' use of shared accounts.
> - This website cannot guarantee the permanent availability, security or stability of shared accounts.
> - If any illegal or non-compliant behavior is found, this website reserves the right to immediately stop providing services and cooperate with relevant authorities in investigation.

---
# Navigation
<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue' // 引入 computed 用于创建响应式属性

const { theme, page } = useData()

// 假设我们现在固定查找包含 'guide' 的侧边栏部分
const guideSidebarItems = computed(() => {
  if (!theme.value.sidebar) return [];

  // 1. 如果你在根语言环境的 index.md
  if (theme.value.sidebar['/en/free-accounts/']) {
    return theme.value.sidebar['/en/free-accounts/'];
  }

  // 2. 如果你在某个具体语言环境的 index.md (例如 /zh-CN/index.md)
  const currentLang = page.lang; // Use page.lang directly, it's like 'zh-CN'
  const langSpecificGuidePath = `/${currentLang}/free-accounts/`;
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
  <p>No related content found.</p>
</div>
