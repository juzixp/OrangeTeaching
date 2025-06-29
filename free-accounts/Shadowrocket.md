---
title: 最新小火箭账号/已购Shadowrocket美区共享APPLE ID账号，小火箭美区账号分享
description: 获取最新免费小火箭Shadowrocket共享账号与已购美区Apple ID，专为iPhone/iPad用户提供。免费下载Shadowrocket，探索美区应用与教程，安全高效获取您所需的美区苹果ID分享。
---

<script setup>
import { ref, onMounted } from 'vue'; // 引入 ref 和 onMounted
import { ElMessage } from 'element-plus'
import accountsList from '../components/free-accounts/accountsList.vue'

// 初始数据，这些是基础的账号和密码，不包含时间
const initialAccounts = [
  { account: 'shenhouyun.com_12@ICLOUD.COM', password: 'shenhouyun.CC_jAAzSmc7sS',status: '正常' },
  { account: 'nb666666.com_1@icloud.com', password: 'shenhouyun.CC_qthN8y7ZdM',status: '正常' },
  { account: 'FX88888888.COM_1@ICLOUD.COM', password: 'shenhouyun.COM_m67hTVTBNM',status: '正常' },
  { account: 'matthewmcbailey0j@gmail.com', password: 'AHjaPam7wS' ,status: '正常'},
  { account: 'kenneth.sheehanmas@icloud.com', password: 'AHjaPam7wS' ,status: '正常'},
  // ... 可以添加更多初始账号
];

// 用于在模板中渲染的响应式账号列表，包含 updateTime
const accounts = ref([]);

const LAST_UPDATE_TIME_KEY = 'lastAppleIdUpdateTime2'; // localStorage 存储上次更新的时间戳
const STORED_ACCOUNTS_KEY = 'storedAppleIdAccounts2'; // localStorage 存储已生成时间的账号列表

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



<h1 style="text-align: center;"><span style="color: #ff0000;"><strong>2025年6月最新免费Shadowrocket下载账号/已购小火箭免费共享Apple ID账号</strong></span></h1>

每日更新，免费提供shadowrocket下载账号/已购买Shadowrocket小火箭的免费共享Apple ID！我们致力于为您提供**实时可用**的美区已购shadowrocket账号，并进行**严格的有效性检测**。通过这些账号，您可以轻松登录 App Store，**免费下载Shadowrocket应用程序**，探索更广阔的数字世界。立即获取，体验无界应用！

---

::: danger

 使用已购Shadowrocket小火箭苹果免费共享账号必须从App Store 登录，千万不要登录「iCloud」跟「设置」，否则可能导致锁机或者隐私泄漏，手机被锁我们也无能为力！

:::

共享账号随时都会失效，如果无可用账号，请过几小时重新查看页面（定时维护）。

---

<strong><span style="color: #ff0000;">推荐1：</span>苹果美国/日本/香港/台湾/英国等地区APPLE ID独享账号<span class="md-meta-i-c md-link"><a href="https://shop.muooy.com/" target="_blank" rel="noreferrer"><span class="md-plain">【点击进入购买】</span></a></span></strong>

<strong><span style="color: #3366ff;">推荐2：</span>已购Shadowrocket（小火箭）独享账号<span class="md-meta-i-c md-link"><a href="https://shop.muooy.com/buy/15" target="_blank" rel="noreferrer"><span class="md-plain">【点击进入购买】</span></a></span></strong>

<strong><span style="color: #ff6600;">推荐3：</span>已购Shadowrocket（小火箭）共享账号<span class="md-meta-i-c md-link md-expand"><a href="https://shop.muooy.com/buy/21" target="_blank" rel="noreferrer"><span class="md-plain">【点击进入购买】</span></a></span></strong>

着急用的用户可以购买独享账户（一直都是你的）或者去租一个，不着急等第下次更新新的免费Apple ID

<el-row :gutter="24" :justify="center">
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://shop.muooy.com/" target="_blank" rel="noreferrer"><el-button color="#3366ff" :dark="isDark">购买独享ID（优惠码：juzixp）</el-button></a>
    </el-col>
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://shop.muooy.com/buy/21" target="_blank" rel="noreferrer"><el-button style="color:#FFFFFF;" color="#ff6600" :dark="isDark">租借临时账号</el-button></a>
    </el-col>
</el-row>

## 免费共享账户列表

<accountsList :accounts="accounts" />


## 登录步骤说明
![](https://img.muooy.com/img/1/2025/06/27/685e58601efd5.webp)

1. **注意：** 仅`只能从App Store商店中登录`，切勿使用iCloud/设置中登录，`否则可能导致锁机`，如有用户操作不当登录设置导致手机被锁本站一概不负责，均由用户自行承担。
2. 打开 `App Store`，点击右上角头`像` → 划到最底部`退出原账号` → 输入新账号密码登录；
3. 登录时选择"其他选项" → "`不升级`"。
4. 搜索需要下载的软件名称Shadowrocket全称下载，如下图
5. [点此阅读苹果共享账户登录App Store步骤](/guide/apple-shared-id-login-app-store.html)

![免费Shadowrocket账户登录步骤](https://img.muooy.com/img/1/2025/06/27/685e600e8fa0f.webp)

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

.buy-btn{
  text-align: center;
}
</style>