<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { getChatSetting, setChatSetting } from '@/store'
import { Check, Close } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'

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
          <span class="title">会话参数设置</span>
        </div>
        <div class="right-panel">
          <el-tooltip content="保存参数" :show-after="1500">
            <el-button :loading="loadingRef" type="primary" @click="handleSaveClick" size="small" :icon="Check" circle></el-button>
          </el-tooltip>
          <el-tooltip content="关闭窗口" :show-after="1500">
            <el-button type="primary" @click="handleCloseClick" size="small" :icon="Close" circle></el-button>
          </el-tooltip>
        </div>
        <div style="clear: both"></div>
      </div>
      <el-form ref="formRef" class="chat-setting-form" :model="formModelRef" label-width="140px">
        <el-form-item prop="isIncludeContext" style="margin-bottom: 0">
          <template #label>
            <span>连续对话</span>
            <el-popover
              :width="300"
              trigger="hover"
              content="发送消息时将附带之前的对话信息发送，此功能开启有助于获得更智能的回答，但同时也将增大token的开销（最大token数量为4096）。"
            >
              <template #reference>
                <el-icon class="label-info-icon"><InfoFilled /></el-icon>
              </template>
            </el-popover>
          </template>
          <el-switch
            inline-prompt
            v-model="formModelRef.isIncludeContext"
            styles="--el-switch-off-color: var(--el-color-info)"
            active-text="是"
            inactive-text="否"
          />
        </el-form-item>
        <el-form-item prop="temperature" label="temperature">
          <template #label>
            <span>temperature</span>
            <el-popover
              :width="300"
              trigger="hover"
              content="数值越大获得的回答越分散随机，数值越小获得的回答越集中确定。"
            >
              <template #reference>
                <el-icon class="label-info-icon"><InfoFilled /></el-icon>
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
    width: 50%;
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
    width: 50%;
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
</style>
