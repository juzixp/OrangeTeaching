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
        <div
          class="account-status"
          :class="account.status === '正常' ? 'normal' : 'abnormal'"
        >
          状态: {{ account.status }}
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.account-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.account-info {
  flex: 1;
  line-height: 1.6;
}

.account-name {
  font-weight: bold;
  color: #333;
}

.account-status {
  font-size: 0.9em;
}
.account-status.normal {
  color: #4caf50;
}
.account-status.abnormal {
  color: #f44336;
}

.check-time {
  color: #666;
  font-size: 0.8em;
}

.account-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s;
}

button:hover {
  background-color: #e9e9e9;
  border-color: #ccc;
}

@media (max-width: 768px) {
  .accounts-list {
    grid-template-columns: 1fr;
  }
}
</style>
