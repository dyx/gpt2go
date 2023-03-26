<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { getChatSetting, getSetting, setChatSetting } from '@/store'
import { Check, Close } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { I18nLanguage } from '@/model/commonConstant'

const props = defineProps<{ modelValue?: boolean }>()
const emit = defineEmits(['update:modelValue'])
const visibleRef = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const formModelRef = ref(getChatSetting())
const formRef = ref<FormInstance>()
const marks = reactive({
  0.1: '0.1',
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2'
})
const loadingRef = ref(false)

const handleSaveClick = () => {
  loadingRef.value = true
  setChatSetting({
    model: formModelRef.value.model,
    isIncludeContext: formModelRef.value.isIncludeContext,
    temperature: formModelRef.value.temperature
  })
  loadingRef.value = false
  visibleRef.value = false
}
const handleCloseClick = () => {
  visibleRef.value = false
  formRef.value?.resetFields()
}
</script>

<template>
  <div>
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="30%"
      :show-close="false"
      v-model="visibleRef"
    >
      <div class="chat-setting-header">
        <div class="left-panel">
          <div class="indicator"></div>
          <span class="title">{{ $t('chatGpt.setting.title') }}</span>
        </div>
        <div class="right-panel">
          <el-tooltip :content="$t('chatGpt.setting.saveButtonTipText')" :show-after="1500">
            <el-button
              :loading="loadingRef"
              type="primary"
              @click="handleSaveClick"
              size="small"
              :icon="Check"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip :content="$t('common.closeDialogTipText')" :show-after="1500">
            <el-button type="primary" @click="handleCloseClick" size="small" :icon="Close" circle></el-button>
          </el-tooltip>
        </div>
        <div style="clear: both"></div>
      </div>
      <el-form
        ref="formRef"
        class="chat-setting-form"
        :model="formModelRef"
        :label-width="getSetting().localeMode === I18nLanguage.ENUS ? '200px' : '120px'"
      >
        <el-form-item prop="model" size="small" style="margin-bottom: 8px">
          <template #label>
            <span>{{ $t('chatGpt.setting.modelFormItem') }}</span>
            <el-popover :width="480" trigger="hover">
              <template #reference>
                <el-icon size="14" class="label-info-icon" style="top: 5px"><InfoFilled /></el-icon>
              </template>
              <template #default>
                <ul class="tip-list">
                  <li>{{ $t('chatGpt.setting.modelFormItemTipText1') }}</li>
                  <li style="margin-top: 8px">
                    {{ $t('chatGpt.setting.modelFormItemTipText2') }}
                  </li>
                  <li>{{ $t('chatGpt.setting.modelFormItemTipText3') }}</li>
                </ul>
              </template>
            </el-popover>
          </template>
          <el-select v-model="formModelRef.model">
            <el-option label="GPT-3.5-Turbo" value="gpt-3.5-turbo" />
            <el-option label="GPT-4" value="gpt-4" />
            <el-option label="GPT-4-32k" value="gpt-4-32k" />
          </el-select>
        </el-form-item>
        <el-form-item prop="isIncludeContext" style="margin-bottom: 0">
          <template #label>
            <span>{{ $t('chatGpt.setting.isIncludeContextFormItem') }}</span>
            <el-popover :width="480" trigger="hover" :content="$t('chatGpt.setting.isIncludeContextFormItemTipText')">
              <template #reference>
                <el-icon size="14" class="label-info-icon"><InfoFilled /></el-icon>
              </template>
            </el-popover>
          </template>
          <el-switch
            inline-prompt
            v-model="formModelRef.isIncludeContext"
            styles="--el-switch-off-color: var(--el-color-info)"
            :active-text="$t('chatGpt.setting.isIncludeContextFormItemSelectOption1')"
            :inactive-text="$t('chatGpt.setting.isIncludeContextFormItemSelectOption2')"
          />
        </el-form-item>
        <el-form-item prop="temperature" label="temperature">
          <template #label>
            <span>{{ $t('chatGpt.setting.temperatureFormItem') }}</span>
            <el-popover :width="480" trigger="hover" :content="$t('chatGpt.setting.temperatureFormItemTipText')">
              <template #reference>
                <el-icon size="14" class="label-info-icon"><InfoFilled /></el-icon>
              </template>
            </el-popover>
          </template>
          <el-slider v-model="formModelRef.temperature" :step="0.1" :min="0.1" :max="2" :marks="marks" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dialog__header) {
  display: none;
}
:deep(.el-dialog__body) {
  padding: 16px;
}
.el-button + .el-button {
  margin-left: 8px;
}
.chat-setting-header {
  .left-panel {
    float: left;
    width: 70%;
    .indicator {
      height: 12px;
      width: 4px;
      background-color: var(--el-color-primary);
      margin-right: 4px;
      position: relative;
      top: 1px;
      display: inline-block;
    }
    .title {
      font-size: 16px;
    }
  }
  .right-panel {
    text-align: right;
    float: left;
    width: 30%;
  }
}
.chat-setting-form {
  margin-top: 8px;
  .label-info-icon {
    position: relative;
    left: 2px;
    top: 9px;
  }
}
.tip-list {
  li {
    list-style-type: disc;
    list-style-position: inside;
    margin-top: 8px;
  }
}
</style>
