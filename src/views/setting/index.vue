<script setup lang="ts">
import { ref } from 'vue'
import { getApiKey, setApiKey } from '@/store'
import { Edit, Check } from '@element-plus/icons-vue'

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
    <el-card>
      <div>
        <div class="setting-indicator"></div>
        <span class="setting-title">设置</span>
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
    <el-card style="margin-top: 16px;">
      <div>
        <div class="setting-indicator"></div>
        <span class="setting-title">关于</span>
      </div>
      <div style="margin-top: 16px;">
        <el-row>
          <el-col>本网站提供了一系列基于OpenAI的API开发的工具，首次使用需要配置API Key。</el-col>
        </el-row>
        <el-row style="margin-top: 4px;">
          <el-col>本网站目前只调用了OpenAI接口，所有数据都存储在客户端的本地localStorage中。</el-col>
        </el-row>
        <el-row style="margin-top: 4px;">
          <el-col>目前网站还存在很多不足，正在积极开发完善中，欢迎使用和反馈。</el-col>
        </el-row>
        <el-row style="margin-top: 4px;">
          <el-col>
            联系邮箱：<el-link :underline="false" style="position: relative; top: -3px;">gpt2go@skiff.com</el-link>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top: 16px;">
      <div>
        <div class="setting-indicator"></div>
        <span class="setting-title">更新日志</span>
      </div>
      <div style="margin-top: 16px">
        <el-timeline>
          <el-timeline-item type="primary" timestamp="2022/03/05" placement="top">
            <el-card shadow="hover">
              <h4>v1.0.0</h4>
              <el-row>
                <el-col>初始版本发布，支持聊天、起名功能</el-col>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.setting-panel {
  padding: 16px 24%;
}
.setting-indicator {
  height: 16px;
  width: 8px;
  background-color: var(--el-color-primary);
  margin-right: 4px;
  position: relative;
  top: 1px;
  display: inline-block;
}
.setting-title {
  font-size: 18px;
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
</style>
