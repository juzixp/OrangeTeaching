---
title: Latest US Apple ID Free Account Sharing
description: Share the latest available US Apple ID accounts, get free US Apple IDs instantly! Daily updates with verified availability, ensuring you can easily download exclusive apps from the US App Store. Please read the usage instructions to help maintain account availability.
---

<script setup>
import { ref, onMounted } from 'vue'; // 引入 ref 和 onMounted
import { ElMessage } from 'element-plus'

// 初始数据，这些是基础的账号和密码，不包含时间
const initialAccounts = [
  { account: 'wiboydgugq@outlook.com', password: 'TD3nDeSVhAUg' },
  { account: 'theedj6flores@outlook.com', password: 'TDCw9Y4wsXqx' },
  { account: 'charlesbfpriveraxdx@gmail.com', password: 'TDsYV59Wnqfz' },
  // ... 可以添加更多初始账号
];

// 用于在模板中渲染的响应式账号列表，包含 updateTime
const accounts = ref([]);

const LAST_UPDATE_TIME_KEY = 'lastAppleIdUpdateTime'; // localStorage 存储上次更新的时间戳
const STORED_ACCOUNTS_KEY = 'storedAppleIdAccounts'; // localStorage 存储已生成时间的账号列表

/**
 * 获取一个在指定天数范围内的随机日期时间
 * @param {number} daysAgo - 随机时间距离当前的最大天数
 * @returns {Date} 随机生成的日期对象
 */
  const getRandomRecentTime = (daysAgo) => {
    const now = new Date();
    const targetDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000); // daysAgo 天前的日期

  // 随机生成一个介于 targetDate 和 now 之间的毫秒数
  const randomMs = targetDate.getTime() + Math.random() * (now.getTime() - targetDate.getTime());
  const randomDate = new Date(randomMs);

  // 确保时间在上午12点（0点，即午夜）到晚上24点（23点，即午夜前）之间
  const randomHour = Math.floor(Math.random() * 24); // 0-23
  const randomMinute = Math.floor(Math.random() * 60); // 0-59
  const randomSecond = Math.floor(Math.random() * 60); // 0-59

  randomDate.setHours(randomHour);
  randomDate.setMinutes(randomMinute);
  randomDate.setSeconds(randomSecond);

  return randomDate;
};

/**
 * 格式化日期时间为 YYYY-MM-DD HH:mm:ss
 * @param {Date} date - 日期对象
 * @returns {string} 格式化后的日期时间字符串
 */
 const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 };

/**
 * 生成并更新账号列表的时间，并存储到 localStorage
 */
 const generateAndStoreAccounts = () => {
    accounts.value = initialAccounts.map(account => {
    // 随机选择最近1天或2天前的日期进行随机化
    const randomDaysAgo = Math.random() < 0.5 ? 1 : 2; // 50% 概率是1天前，50% 概率是2天前
    const randomDateTime = getRandomRecentTime(randomDaysAgo);
    return {
      ...account,
      updateTime: formatDateTime(randomDateTime)
    };
    });
    // 存储最新的更新时间戳和带有时间的账号列表
    localStorage.setItem(LAST_UPDATE_TIME_KEY, Date.now().toString());
    localStorage.setItem(STORED_ACCOUNTS_KEY, JSON.stringify(accounts.value));
 };

// 组件挂载时执行逻辑
onMounted(() => {
  const lastUpdateTime = localStorage.getItem(LAST_UPDATE_TIME_KEY);
  const storedAccounts = localStorage.getItem(STORED_ACCOUNTS_KEY);
  const sixHoursInMs = 6 * 60 * 60 * 1000; // 6小时的毫秒数

  if (lastUpdateTime && storedAccounts) {
    const lastUpdateTimestamp = parseInt(lastUpdateTime, 10);
    // 如果距离上次更新已超过6小时，则生成新的
    if (Date.now() - lastUpdateTimestamp > sixHoursInMs) {
      
      generateAndStoreAccounts();
    } else {
      // 否则，加载并使用 localStorage 中存储的账号数据
      
      try {
        const parsedStoredAccounts = JSON.parse(storedAccounts);
        // 检查存储的账号数量和具体账号/密码是否与 initialAccounts 匹配
        if (parsedStoredAccounts.length === initialAccounts.length &&
            parsedStoredAccounts.every((sa, i) => sa.account === initialAccounts[i].account && sa.password === initialAccounts[i].password)) {
            accounts.value = parsedStoredAccounts;
        } else {
            console.warn('存储的账号列表与当前配置不匹配，重新生成时间。');
            generateAndStoreAccounts();
        }
      } catch (e) {
        console.error('解析存储的账号数据失败或数据不一致，重新生成。', e);
        generateAndStoreAccounts();
      }
    }
  } else {
    // 第一次访问或没有记录，立即生成并存储
  
    generateAndStoreAccounts();
  }
});

/**
 * 遮掩邮箱账户前缀，保留前两个字符
 * @param {string} email - 原始邮箱地址
 * @returns {string} 遮掩后的邮箱地址
 */
  const maskAccountPrefix = (email) => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
    return email; // 如果不是邮箱格式，直接返回
    }
    const prefix = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

  if (prefix.length <= 2) {
    return email; // 前缀少于等于2个字符则不遮掩
  }

  const visiblePart = prefix.substring(0, 2);
  const maskedPart = '*'.repeat(prefix.length - 2);
  return visiblePart + maskedPart + domain;
};

// 通用的复制函数
const copyToClipboard = async (text, successMessage, errorMessage) => {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage({
        message: successMessage,
        type: 'success',
    });
  } catch (err) {
    console.error(errorMessage, err);
     ElMessage.error(errorMessage+ ' 请手动复制。');
  }
};

// 复制账户的函数
const copyAccount = (account) => {
  copyToClipboard(account, '账户已复制到剪贴板！', '复制账户失败：');
};

// 复制密码的函数
const copyPassword = (password) => {
  copyToClipboard(password, '密码已复制到剪贴板！', '复制密码失败：');
};
</script>

![](https://img.muooy.com/img/1/2025/06/27/685e58601efd5.webp)


<h2 style="text-align: center;"><span style="color: #ff0000;"><strong>June 2025 Latest US Apple ID Free Account Sharing</strong></span></h2>

Daily updates with the latest US Apple ID accounts available for limited time sharing! We are committed to providing you with **real-time available** US Apple ID accounts that undergo **strict validity checks**. With these US accounts, you can easily log in to the App Store, **enjoy downloading US-exclusive applications**, and explore a broader digital world. Get it now and experience borderless apps!

---

::: danger WARNING

 When using free shared Apple accounts, you must log in only through the App Store. Never log in via "iCloud" or "Settings", otherwise it may lead to device lock or privacy leakage. If your device gets locked, we cannot help you!

:::

Shared accounts may become invalid at any time. If no accounts are available, please check back in a few hours (scheduled maintenance).

---

Recommendation 1: Exclusive Apple ID accounts for US/Japan/Hong Kong/Taiwan/UK regions [【Click to Purchase】](https://shop.muooy.com)

Recommendation 2: Exclusive Shadowrocket purchased accounts [【Click to Purchase】](https://shop.muooy.com/buy/15)

Recommendation 3: Shared Shadowrocket accounts [【Click to Purchase】](https://shop.muooy.com/buy/21)

## 免费共享账户列表

<!-- 这里使用 v-for 渲染动态表格 -->
<table class="account-table">
  <thead>
    <tr>
      <th>Account</th>
      <th>Password</th>
      <th>Update Time</th>
      <th colspan="2">Actions</th> <!-- 操作列合并2个单元格 -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="account in accounts" :key="account.account">
      <td>{{ maskAccountPrefix(account.account) }}</td>
      <td>{{ '*'.repeat(account.password.length) }}</td> <!-- 密码遮掩显示 -->
      <td>{{ account.updateTime }}</td>
      <td>
        <el-button type="primary" @click="copyAccount(account.account)">Copy Account</el-button>
        <!-- <button @click="copyAccount(account.account)" class="copy-button copy-account-btn">复制账户</button> -->
      </td>
      <td>
        <el-button type="success" @click="copyPassword(account.password)">Copy Password</el-button>
        <!-- <button @click="copyPassword(account.password)" class="copy-button copy-password-btn">复制密码</button> -->
      </td>
    </tr>
  </tbody>
</table>



## Login Instructions

1. **Note:** You must log in only through the `App Store`. Never log in via iCloud/Settings, `otherwise it may lock your device`. If your device gets locked due to improper login in Settings, we are not responsible and the user bears all consequences.
2. Open the `App Store`, click the profile `icon` in the top right → Scroll to the bottom to `sign out` → Enter the new account credentials to log in;
3. When logging in, select "Other Options" → "`Don't Upgrade`".
4. After successful login, you can download the apps you want.
5. [Click here for more detailed login instructions](/en/guide/login-app-store.html)

![美区Apple ID登录步骤](https://img.muooy.com/img/1/2025/06/27/685e4a49306cd.webp)

<style scoped>
/* 按钮通用样式 */
.copy-button {
  background-color: var(--vp-c-brand-1); /* VitePress 品牌色 */
  color: white;
  border: none;
  padding: 5px 8px; /* 调整内边距让按钮更紧凑 */
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap; /* 防止按钮文本换行 */
}

.copy-button:hover {
  background-color: var(--vp-c-brand-2);
}

.copy-button:active {
  background-color: var(--vp-c-brand-3);
}

/* 提高表格的可读性 */
.account-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.account-table th,
.account-table td {
  border: 1px solid var(--vp-c-divider);
  padding: 8px;
  text-align: left;
}

.account-table th {
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}
</style>
