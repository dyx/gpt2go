<script setup lang="ts">
import { ref } from 'vue'
import { getApiKey, setApiKey } from '@/store'
import { Edit, Check } from '@element-plus/icons-vue'
import About from '@/views/setting/About.vue'
import UpdateLog from '@/views/setting/UpdateLog.vue'

const apiKeyRef = ref(getApiKey())
const apiKeyEditingRef = ref(false)
const apiKeyInputTypeRef = ref('password')

const handleEditApiKeyClick = () => {
  apiKeyEditingRef.value = true
  apiKeyInputTypeRef.value = 'text'
}
const handleSaveApiKeyClick = () => {
  if (apiKeyRef.value && apiKeyRef.value.trim().length > 0) {
    setApiKey(apiKeyRef.value.trim())
    apiKeyEditingRef.value = false
    apiKeyInputTypeRef.value = 'password'
  }
}
</script>

<template>
  <div class="setting-panel">
    <el-scrollbar>
      <el-card>
        <div class="card-header">
          <div class="indicator"></div>
          <span class="title">设置</span>
        </div>
        <div class="setting-api-key">
          <div class="setting-api-key-label">API Key</div>
          <div class="setting-api-key-value">
            <el-input :type="apiKeyInputTypeRef" :disabled="!apiKeyEditingRef" v-model="apiKeyRef"></el-input>
          </div>
          <div class="setting-api-key-button">
            <el-button
              v-if="apiKeyEditingRef"
              circle
              type="primary"
              :icon="Check"
              @click="handleSaveApiKeyClick"
            ></el-button>
            <el-button v-else circle type="primary" :icon="Edit" @click="handleEditApiKeyClick"></el-button>
          </div>
          <div style="clear: both"></div>
        </div>
      </el-card>
      <About style="margin-top: 16px"></About>
      <UpdateLog style="margin-top: 16px"></UpdateLog>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.setting-panel {
  height: calc(100vh - 32px);
  margin: 16px 24%;
  :deep(.el-divider--horizontal) {
    margin: 8px 0;
  }
  .setting-api-key {
    margin-top: 16px;
  }
  .setting-api-key-label {
    float: left;
    width: 56px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
  }
  .setting-api-key-value {
    float: left;
    width: calc(100% - 120px);
    padding: 0 16px;
  }
  .setting-api-key-button {
    float: left;
    width: 32px;
  }
}
</style>
