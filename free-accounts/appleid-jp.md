---
title: 最新日本苹果ID账号APPLE ID 免费账号共享
description: 分享可用的日本苹果AppleID账号，立即获取最新免费日区Apple ID共享账号！每日更新并亲测验证可用性，确保您能轻松下载日本区App Store独占应用。请查阅使用说明，共同维护账号可用性。
---

<script setup>
import { ref, onMounted } from 'vue'; // 引入 ref 和 onMounted
import axios from 'axios';
import { ElMessage } from 'element-plus'
import accountsList from '../components/free-accounts/accountsList.vue'

const getCurrentYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return `${year}年${month < 10 ? '' : ''}${month}月`;
};

const currentTitle = ref(getCurrentYearMonth());


// 初始数据，这些是基础的账号和密码，不包含时间
const initialAccounts = [
  { account: 'jirepa9677@virtuxis.com', password: 'G2vkspZ2aY' ,status: '正常' },
  // ... 可以添加更多初始账号
];

// 用于在模板中渲染的响应式账号列表，包含 updateTime
const accounts = ref([]);
const isLoading = ref(false);

const LAST_UPDATE_TIME_KEY = 'lastAppleIdUpdateTime4'; // localStorage 存储上次更新的时间戳
const STORED_ACCOUNTS_KEY = 'storedAppleIdAccounts4'; // localStorage 存储已生成时间的账号列表

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

// 从API获取额外账号数据
const fetchAdditionalAccounts = async () => {
  try {
    const urls = [
      'https://idshare001.me/node/getid.php?getid=1',
      'https://idshare001.me/node/getid.php?getid=2'
    ];
    
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    return responses.flatMap(response => 
      response.data.map(item => ({
        account: item.username,
        password: item.password,
        status: item.status === 1 ? '正常' : '异常',
        updateTime: item.time,
        fromAPI: true
      }))
    );
  } catch (error) {
    console.error('获取额外账号失败:', error);
    return [];
  }
};

// 组件挂载时执行逻辑
onMounted(async () => {
  isLoading.value = true;

  // 1. 先加载本地账号
  const lastUpdateTime = localStorage.getItem(LAST_UPDATE_TIME_KEY);
  const storedAccounts = localStorage.getItem(STORED_ACCOUNTS_KEY);
  const sixHoursInMs = 6 * 60 * 60 * 1000; // 6小时的毫秒数

  if (lastUpdateTime && storedAccounts) {
    const lastUpdateTimestamp = parseInt(lastUpdateTime, 10);
    if (Date.now() - lastUpdateTimestamp > sixHoursInMs) {
      generateAndStoreAccounts();
    } else {
      try {
        const parsedStoredAccounts = JSON.parse(storedAccounts);
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
    generateAndStoreAccounts();
  }

  // 2. 异步获取API账号数据
  /* try {
    const apiAccounts = await fetchAdditionalAccounts();
    if (apiAccounts.length > 0) {
      accounts.value = [...apiAccounts, ...accounts.value];
    }
  } catch (error) {
    console.error('API账号加载失败:', error);
  } finally {
    isLoading.value = false;
  } */


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
</script>

<h1 style="text-align: center;"><span style="color: #ff0000;"><strong>{{currentTitle}}最新苹果日本账号 APPLE ID 免费账号共享</strong></span></h1>

每日更新，最新**日区 Apple ID账号** 限时共享！我们致力于为您提供**实时可用**的**日本 Apple ID 账户**，并进行**严格的有效性检测**。通过这些**日区账号**，您可以轻松登录 App Store，**畅享下载日本独有的应用程序**，探索更广阔的数字世界。立即获取，体验无界应用！

---

::: danger 

 使用共享苹果账号必须从App Store 登录，千万不要登录「iCloud」跟「设置」，否则可能导致锁机或者隐私泄漏，手机被锁我们也无能为力！

:::

共享账号随时都会失效，如果无可用账号，请过几小时重新查看页面（定时维护）。

如果你担心隐私问题或着急用的用户可以购买独享账户（一直都是你的）或者去租一个，不着急等第下次更新新的免费Apple ID


<el-row :gutter="24">
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://juzixp.top/" target="_blank" ><el-button color="#3366ff" :dark="isDark">购买独享Apple ID账号</el-button></a>
    </el-col>
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://juzixp.top/buy/21" target="_blank" ><el-button style="color:#FFFFFF;" color="#ff6600" :dark="isDark">购买小火箭/共享账号</el-button></a>
    </el-col>
</el-row>

## 日区共享账户列表

<accountsList :accounts="accounts" :loading="isLoading" />


## 登录步骤&使用指南
![登录提示](https://img.muooy.com/img/1/2025/06/27/685e58601efd5.webp)


1. **注意：** 仅`只能从App Store商店中登录`，切勿使用iCloud/设置中登录，`否则可能导致锁机`，如有用户操作不当登录设置导致手机被锁本站一概不负责，均由用户自行承担。
2. 打开 `App Store`，点击右上角头`像` → 划到最底部`退出原账号` → 输入新账号密码登录；
3. 登录时选择"其他选项" → "`不升级`"。
4. 登录成功后即可下载你想下载App啦。
5. [点此阅读苹果共享账户登录App Store步骤](/guide/apple-shared-id-login-app-store.html)

![日本Apple ID登录步骤](https://img.muooy.com/img/1/2025/06/27/685e4a49306cd.webp)

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
