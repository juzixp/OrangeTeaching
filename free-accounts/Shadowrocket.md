---
title: 最新小火箭账号/已购Shadowrocket美区共享APPLE ID账号，小火箭美区账号分享
description: 获取最新免费小火箭Shadowrocket共享账号与已购美区Apple ID，专为iPhone/iPad用户提供。免费下载Shadowrocket，探索美区应用与教程，安全高效获取您所需的美区苹果ID分享。
---

<script setup>
import { ref, onMounted} from 'vue';
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

// 初始账号数据
const initialAccounts = [
  { account: 'mason9lste@outlook.com', password: 'TDCTRpW4akuU', status: '正常' },
  { account: 'chloedvpowellgl@gmail.com', password: 'Fe6M3ZsnBA', status: '正常' },
  { account: '1045g936c45asg@jetlf.com', password: 'Cs!X2Hvh', status: '正常' },
  { account: 'matthewmcbailey0j@gmail.com', password: 'AHjaPam7wS', status: '正常'},
  { account: 'kenneth.sheehanmas@icloud.com', password: 'AHjaPam7wS', status: '正常'},
];

const accounts = ref([]);
const isLoading = ref(false);

const LAST_UPDATE_TIME_KEY = 'lastAppleIdUpdateTime2';
const STORED_ACCOUNTS_KEY = 'storedAppleIdAccounts2';

// 解析文本格式账号数据
const parseTextAccounts = (text) => {
  const accounts = [];
  const blocks = text.split('\n\n');
  
  blocks.forEach(block => {
    if (!block.trim()) return;
    
    const lines = block.split('\n');
    const account = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        if (key === '账号状态') account.status = value === '正常' ? '正常' : '异常';
        else if (key === '国家') account.country = value;
        else if (key === '账号') account.account = value;
        else if (key === '密码') account.password = value;
        else if (key === '更新时间') account.updateTime = value.split(' +')[0];
      }
    });
    
    if (account.account && account.password) {
      accounts.push({
        account: account.account,
        password: account.password,
        status: account.status || '正常',
        updateTime: account.updateTime || new Date().toISOString(),
        fromAPI: true
      });
    }
  });
  
  return accounts;
};

// 从代理API获取go-rod账号数据
const fetchRodAccounts = async () => {
  try {
    const urls = [
      'https://di.juzixp.top/go-rod/0.txt',
      'https://di.juzixp.top/go-rod/1.txt',
      'https://di.juzixp.top/go-rod/2.txt'
    ];
    
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    return responses.flatMap(response => 
      parseTextAccounts(response.data)
    );
  } catch (error) {
    console.error('获取go-rod账号失败:', error);
    return [];
  }
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
  
  // 加载本地账号
  const lastUpdateTime = localStorage.getItem(LAST_UPDATE_TIME_KEY);
  const storedAccounts = localStorage.getItem(STORED_ACCOUNTS_KEY);

  if (lastUpdateTime && storedAccounts) {
    try {
      accounts.value = JSON.parse(storedAccounts);
    } catch (e) {
      console.error('解析存储的账号数据失败:', e);
      accounts.value = initialAccounts;
    }
  } else {
    accounts.value = initialAccounts;
  }

  // 获取API账号数据
  try {
    const [apiAccounts, rodAccounts] = await Promise.all([
      fetchAdditionalAccounts(),
      fetchRodAccounts()
    ]);
    
    // 合并所有API账号到本地账号前面
    const allApiAccounts = [...apiAccounts, ...rodAccounts];
    if (allApiAccounts.length > 0) {
      accounts.value = [...allApiAccounts, ...accounts.value];
    }
  } catch (error) {
    console.error('API账号加载失败:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>



<h1 style="text-align: center;"><span style="color: #ff0000;"><strong>{{currentTitle}}免费Shadowrocket小火箭共享账号 | 已购买小火箭免费共享Apple ID</strong></span></h1>

每日更新，免费**已购Shadowrocket小火箭共享Apple ID**！我们致力于为您提供**实时可用**的shadowrocket已购付费美区账号共享，并进行**严格的有效性检测**。通过这些账号，您可以轻松登录 App Store，**免费下载Shadowrocket**应用程序，探索更广阔的数字世界。立即获取，体验无界应用！

---

::: danger

 使用**小火箭Shadowrocket苹果共享账号**必须从App Store 登录，千万不要登录「iCloud」跟「设置」，否则可能导致锁机或者隐私泄漏，手机被锁我们也无能为力！

:::

共享账号随时都会失效，如果无可用账号，请过几小时重新查看页面（定时维护）。

如果你担心隐私问题或着急用的用户可以购买独享账户（一直都是你的）或者去租一个，不着急等第下次更新新的免费Apple ID

---

<strong><span style="color: #ff0000;">推荐1：</span>苹果美国/日本/香港/台湾/英国等地区APPLE ID独享账号<span class="md-meta-i-c md-link"><a href="https://shop.muooy.com/" target="_blank" ><span class="md-plain">【点击进入购买】</span></a></span></strong>

<strong><span style="color: #3366ff;">推荐2：</span>已购Shadowrocket（小火箭）独享成品账号<span class="md-meta-i-c md-link"><a href="https://shop.muooy.com/buy/15" target="_blank" ><span class="md-plain">【点击进入购买】</span></a></span></strong>

<strong><span style="color: #ff6600;">推荐3：</span>已购Shadowrocket（小火箭）共享账号<span class="md-meta-i-c md-link md-expand"><a href="https://shop.muooy.com/buy/21" target="_blank" ><span class="md-plain">【点击进入购买】</span></a></span></strong>

<el-row :gutter="24">
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://shop.muooy.com/" target="_blank" ><el-button color="#3366ff" :dark="isDark">购买独享ID（优惠码：juzixp）</el-button></a>
    </el-col>
    <el-col style="text-align: center;" :span="12" :xs="24">
      <a href="https://shop.muooy.com/buy/21" target="_blank" ><el-button style="color:#FFFFFF;" color="#ff6600" :dark="isDark">租借临时账号</el-button></a>
    </el-col>
</el-row>

## 免费共享账户列表

<accountsList :accounts="accounts" />


## 登录步骤说明
![登录提示](https://img.muooy.com/img/1/2025/06/27/685e58601efd5.webp)

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