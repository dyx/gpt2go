<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Close, Download } from '@element-plus/icons-vue'
import { ChatExportModel } from '@/model/commonModel'
import { getMessageList } from '@/store'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { FormRules } from 'element-plus'
import html2canvas from 'html2canvas'
import { downloadFile } from '@/utils/commonUtil'

const props = defineProps<{ modelValue?: boolean; exportElement: any }>()
const emit = defineEmits(['update:modelValue'])
const visibleRef = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const formRef = ref()
const formModelRef = ref<ChatExportModel>({
  filename: `gpt2go-session-${new Date().getTime()}`,
  fileFormat: '.md'
})
const rulesRef = ref<FormRules>({
  filename: [
    {
      required: true,
      message: '文件名必填',
      trigger: 'blur'
    }
  ]
})
const loadingRef = ref(false)

const handleCloseClick = () => {
  visibleRef.value = false
  formRef.value.resetFields()
}
const handleExportClick = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (formModelRef.value.fileFormat === '.md') {
        exportMarkdown()
      } else if (formModelRef.value.fileFormat === '.png') {
        exportImage()
      }
    }
  })
}
const exportMarkdown = () => {
  loadingRef.value = true
  let markdownContent = ''
  for (const messageModel of getMessageList()) {
    if (messageModel.role === ChatCompletionRequestMessageRoleEnum.User) {
      markdownContent += '> ' + messageModel.content + '\n\n'
    } else {
      markdownContent += messageModel.content + '\n\n'
    }
  }
  downloadFile(
    window.URL.createObjectURL(new Blob([markdownContent])),
    (formModelRef.value.filename as string) + (formModelRef.value.fileFormat as string)
  )
  visibleRef.value = false
  loadingRef.value = false
}
const exportImage = () => {
  loadingRef.value = true
  html2canvas(props.exportElement, {
    scale: 2,
    allowTaint: false,
    useCORS: true,
    backgroundColor: '#000000'
  })
    .then(canvas => {
      downloadFile(
        canvas.toDataURL('image/png'),
        (formModelRef.value.filename as string) + (formModelRef.value.fileFormat as string)
      )
    })
    .finally(() => {
      visibleRef.value = false
      loadingRef.value = false
    })
}

watch(
  () => visibleRef.value,
  visible => {
    if (visible) {
      formModelRef.value.filename = `gpt2go-session-${new Date().getTime()}`
      formModelRef.value.fileFormat = '.md'
    }
  }
)
</script>

<template>
  <div>
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
      :show-close="false"
      v-model="visibleRef"
    >
      <div class="chat-export-header">
        <div class="left-panel">
          <div class="indicator"></div>
          <span class="title">导出会话</span>
        </div>
        <div class="right-panel">
          <el-tooltip content="导出文件" :show-after="1500">
            <el-button
              :loading="loadingRef"
              type="primary"
              @click="handleExportClick"
              size="small"
              :icon="Download"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip content="关闭窗口" :show-after="1500">
            <el-button type="primary" @click="handleCloseClick" size="small" :icon="Close" circle></el-button>
          </el-tooltip>
        </div>
        <div style="clear: both"></div>
      </div>
      <el-form ref="formRef" :model="formModelRef" :rules="rulesRef">
        <el-form-item prop="filename">
          <el-input v-model="formModelRef.filename" placeholder="请输入文件名" style="margin-top: 8px">
            <template #prepend>
              <el-select v-model="formModelRef.fileFormat" placeholder="Select" style="width: 120px">
                <el-option label="Markdown" value=".md" />
                <el-option label="图片" value=".png" />
              </el-select>
            </template>
            <template #append>
              {{ formModelRef.fileFormat }}
            </template>
          </el-input>
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
.chat-export-header {
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
.chat-export-form {
  margin-top: 8px;
}
</style>
