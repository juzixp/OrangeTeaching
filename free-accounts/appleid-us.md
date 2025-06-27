---
title: 最新苹果美区账号APPLE ID 免费账号共享
description: 分享最新可用苹果美区账号，立即获取最新免费美区Apple ID！每日更新并亲测验证可用性，确保您能轻松下载美区App Store独占应用。请查阅使用说明，共同维护账号可用性。
---

<script setup>
import { ref, onMounted } from 'vue'; // 引入 ref 和 onMounted
import { ElMessage } from 'element-plus'

// 初始数据，这些是基础的账号和密码，不包含时间
const initialAccounts = [
  { account: 'wiboydgugq@outlook.com', password: 'TD3nDeSVhAUg' },
  { account: 'theedj6flores@outlook.com', password: 'TDCw9Y4wsXqx' },
  { account: 'charlesbfpriveraxdx@gmail.com', password: 'TDsYV59Wnqfz' },
  { account: 'toddcopthorne@mail.com', password: 'CwF@FAM6' },
  { account: 'steverlarson0y039@gmail.com', password: 'Eg68Kd52' },
  { account: 'lancerowe15958@gmail.com', password: 'Te37Ku42' },
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


<h2 style="text-align: center;"><span style="color: #ff0000;"><strong>2025年6月最新苹果美区账号 APPLE ID 免费账号共享</strong></span></h2>

每日更新，最新美区 Apple ID 限时共享！我们致力于为您提供**实时可用**的美国区 Apple ID 账户，并进行**严格的有效性检测**。通过这些美区账号，您可以轻松登录 App Store，**畅享下载美区独有的应用程序**，探索更广阔的数字世界。立即获取，体验无界应用！

---

::: danger 警告

 使用免费共享苹果账号必须从App Store 登录，千万不要登录「iCloud」跟「设置」，否则可能导致锁机或者隐私泄漏，手机被锁我们也无能为力！

:::

共享账号随时都会失效，如果无可用账号，请过几小时重新查看页面（定时维护）。

---

推荐1：苹果美国/日本/香港/台湾/英国等地区APPLE ID独享账号[【点击进入购买】](https://shop.muooy.com)

推荐2：已购Shadowrocket（小火箭）独享账号[【点击进入购买】](https://shop.muooy.com/buy/15)

推荐3：已购Shadowrocket（小火箭）共享账号[【点击进入购买】](https://shop.muooy.com/buy/21)

## 免费共享账户列表

<!-- 这里使用 v-for 渲染动态表格 -->
<table class="account-table">
  <thead>
    <tr>
      <th>账户</th>
      <th>密码</th>
      <th>更新时间</th>
      <th colspan="2">操作</th> <!-- 操作列合并2个单元格 -->
    </tr>
  </thead>
  <tbody>
    <tr v-for="account in accounts" :key="account.account">
      <td>{{ maskAccountPrefix(account.account) }}</td>
      <td>{{ '*'.repeat(account.password.length) }}</td> <!-- 密码遮掩显示 -->
      <td>{{ account.updateTime }}</td>
      <td>
        <el-button type="primary" @click="copyAccount(account.account)">复制账户</el-button>
        <!-- <button @click="copyAccount(account.account)" class="copy-button copy-account-btn">复制账户</button> -->
      </td>
      <td>
        <el-button type="success" @click="copyPassword(account.password)">复制密码</el-button>
        <!-- <button @click="copyPassword(account.password)" class="copy-button copy-password-btn">复制密码</button> -->
      </td>
    </tr>
  </tbody>
</table>



## 登录步骤说明

1. **注意：** 仅`只能从App Store商店中登录`，切勿使用iCloud/设置中登录，`否则可能导致锁机`，如有用户操作不当登录设置导致手机被锁本站一概不负责，均由用户自行承担。
2. 打开 `App Store`，点击右上角头`像` → 划到最底部`退出原账号` → 输入新账号密码登录；
3. 登录时选择"其他选项" → "`不升级`"。
4. 登录成功后即可下载你想下载App啦。
5. [点此阅读更详细的登录步骤说明](/guide/login-app-store.html)

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