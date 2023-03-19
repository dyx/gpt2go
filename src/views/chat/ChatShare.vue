<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import html2canvas from 'html2canvas'
import { downloadFile } from '@/utils/commonUtil'
import { Download } from '@element-plus/icons-vue'
import { MessageModel } from '@/model/commonModel'
import { marked } from 'marked'
import ChatContent from '@/views/chat/components/ChatContent.vue'

const props = defineProps<{ modelValue?: boolean; messageModelList: MessageModel[] }>()
const emit = defineEmits(['update:modelValue'])
const visibleRef = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const downloadButtonLoadingRef = ref(false)

const handleDownloadClick = () => {
  downloadButtonLoadingRef.value = true
  const element = document.getElementById('shareMessageContent')
  html2canvas(element as HTMLElement, {
    scale: 2,
    allowTaint: false,
    useCORS: true,
    backgroundColor: '#000000'
  })
    .then(canvas => {
      downloadFile(canvas.toDataURL('image/png'), `gpt2go-share-${new Date().getTime()}.png`)
    })
    .finally(() => {
      downloadButtonLoadingRef.value = false
    })
}

onMounted(() => {
  marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false
  })
})
</script>

<template>
  <div class="share-panel">
    <el-dialog top="5vh" width="60%" :show-close="false" v-model="visibleRef">
      <div class="share-message-panel">
        <el-scrollbar>
          <div id="shareMessageContent">
            <ChatContent :show-operate-area="false" :message-model-list="messageModelList"></ChatContent>
          </div>
        </el-scrollbar>
      </div>
      <div class="button-panel">
        <el-button
          type="primary"
          :loading="downloadButtonLoadingRef"
          @click="handleDownloadClick"
          :icon="Download"
          circle
        ></el-button>
      </div>
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
.share-panel {
  .share-message-panel {
    height: calc(95vh - 160px);
  }
  .button-panel {
    width: 100%;
    text-align: center;
    margin-top: 8px;
  }
}
</style>
