<script setup lang="ts">
import { ref } from 'vue'
import { getApiKey, getSetting, setApiKey } from '@/store'
import { Edit, Check } from '@element-plus/icons-vue'
import About from '@/views/setting/About.vue'
import UpdateLog from '@/views/setting/UpdateLog.vue'
import { changeThemeMode } from '@/utils/commonUtil'
import { locales } from '@/i18n'
import { useLocaleModeStore } from '@/store/localeModeStore'

const localeModeStore = useLocaleModeStore()
const settingModel = getSetting()
const apiKeyRef = ref(getApiKey())
const apiKeyEditingRef = ref(false)
const apiKeyInputTypeRef = ref('password')
const themeModeRef = ref(settingModel.themeMode)
const localeModeRef = ref(localeModeStore.localeMode)

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
const handleThemeChange = (value: string) => {
  changeThemeMode(value)
}
const handleLocaleChange = (value: string) => {
  localeModeStore.changeLocaleMode(value)
}
</script>

<template>
  <div class="setting-panel">
    <el-scrollbar>
      <el-card>
        <div class="card-header">
          <div class="indicator"></div>
          <span class="title">{{ $t('setting.title') }}</span>
        </div>
        <div class="setting-item">
          <div class="label">API Key</div>
          <div class="api-key-value">
            <el-input :type="apiKeyInputTypeRef" :disabled="!apiKeyEditingRef" v-model="apiKeyRef"></el-input>
          </div>
          <div class="api-key-button">
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
        <div class="setting-item">
          <div class="label">{{ $t('setting.theme.title') }}</div>
          <div class="value">
            <el-select v-model="themeModeRef" @change="handleThemeChange">
              <el-option :label="$t('setting.theme.selectOptionSystem')" value="system"></el-option>
              <el-option :label="$t('setting.theme.selectOptionLight')" value="light"></el-option>
              <el-option :label="$t('setting.theme.selectOptionDark')" value="dark"></el-option>
            </el-select>
          </div>
          <div style="clear: both"></div>
        </div>
        <div class="setting-item">
          <div class="label">{{ $t('setting.language.title') }}</div>
          <div class="value">
            <el-select v-model="localeModeRef" @change="handleLocaleChange">
              <el-option
                v-for="(item, index) in locales"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
  .setting-item {
    margin-top: 16px;
    .api-key-value {
      float: left;
      width: calc(100% - 120px);
      padding: 0 16px;
    }
    .api-key-button {
      float: left;
      width: 32px;
    }
    .label {
      float: left;
      width: 56px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
    }
    .value {
      float: left;
      margin-left: 16px;
    }
  }
}
</style>
