<template>
  <div class="accounts-list">
    <div
      v-for="account in accounts"
      :key="account.account"
      class="account-item"
    >
      <div class="account-info">
        <div class="account-name">
          账号: {{ maskAccountPrefix(account.account) }}
        </div>
        <div class="account-status">
          状态:
          <span
            :class="
              account.status === '正常'
                ? 'account-status-normal'
                : 'account-status-abnormal'
            "
            >{{ account.status }}</span
          >
        </div>
        <div class="check-time">检测时间: {{ account.updateTime }}</div>
      </div>
      <div class="account-actions">
        <button @click="copyAccount(account.account)">复制账号</button>
        <button @click="copyPassword(account.password)">复制密码</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  accounts: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const copyAccount = (text) => {
  navigator.clipboard.writeText(text);

  ElMessage({
    message: "账号已复制",
    type: "success",
  });
};

const copyPassword = (text) => {
  navigator.clipboard.writeText(text);

  ElMessage({
    message: "密码已复制",
    type: "success",
  });
};

/**
 * 遮掩邮箱账户前缀，保留前两个字符
 * @param {string} email - 原始邮箱地址
 * @returns {string} 遮掩后的邮箱地址
 */
const maskAccountPrefix = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return email; // 如果不是邮箱格式，直接返回
  }
  const prefix = email.substring(0, atIndex);
  const domain = email.substring(atIndex);

  if (prefix.length <= 2) {
    return email; // 前缀少于等于2个字符则不遮掩
  }

  const visiblePart = prefix.substring(0, 2);
  const maskedPart = "*".repeat(prefix.length - 2);
  return visiblePart + maskedPart + domain;
};
</script>

<style scoped>
.accounts-list {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.account-item {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 2px 4px var(--vp-c-shadow-1);
  transition: all 0.3s ease;
}

.account-item:hover {
  box-shadow: 0 4px 8px var(--vp-c-shadow-2);
}

.account-info {
  flex: 1;
  line-height: 1.6;
}

.account-name {
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.account-status {
  font-size: 0.9em;
}
.account-status-normal {
  color: #4caf50; /* 绿色 */
}
.account-status-abnormal {
  color: #f44336; /* 红色 */
}

.check-time {
  color: var(--vp-c-text-2);
  font-size: 0.8em;
}

.account-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

button {
  padding: 8px 16px;
  background-color: var(--vp-c-mute);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

button:hover {
  background-color: var(--vp-c-mute-dark);
  border-color: var(--vp-c-divider-dark);
}

@media (max-width: 768px) {
  .accounts-list {
    grid-template-columns: 1fr;
  }
}
</style>
