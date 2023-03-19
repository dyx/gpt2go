<script setup lang="ts">
import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { MessageModel } from '@/model/commonModel'
import { onMounted } from 'vue'
import { marked } from 'marked'
import ChatEmptyContent from '@/views/chat/components/ChatEmptyContent.vue'
const props = defineProps<{ messageModelList: MessageModel[]; showOperateArea?: boolean }>()

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
  <div v-if="messageModelList && messageModelList.length > 0">
    <div
      v-for="(item, index) in messageModelList"
      :key="item.id + index"
      class="message-item"
      :style="{
        backgroundColor:
          item.role === ChatCompletionRequestMessageRoleEnum.Assistant ? 'rgb(247,247,248)' : 'rgb(255,255,255)'
      }"
    >
      <div class="message-item-avatar-panel">
        <div class="message-item-avatar">
          <el-icon
            v-if="item.role === ChatCompletionRequestMessageRoleEnum.Assistant"
            size="16"
            class="message-item-avatar-icon"
            ><Monitor
          /></el-icon>
          <el-icon v-else size="16" class="message-item-avatar-icon"><User /></el-icon>
        </div>
      </div>
      <div
        v-if="item.role === ChatCompletionRequestMessageRoleEnum.Assistant"
        class="message-item-content"
        v-marked
        v-html="marked.parse(item.content)"
        :style="{
          width: showOperateArea
            ? 'calc(100% - var(--message-item-avatar-width) - 16px - var(--message-item-button-panel-width)'
            : 'calc(calc(100% - var(--message-item-avatar-width) - 16px)'
        }"
      ></div>
      <div v-else class="message-item-content user">{{ item.content }}</div>
      <div v-show="showOperateArea" class="message-item-button-panel">
        <slot name="operateArea" :item="item"> </slot>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
  <ChatEmptyContent v-else></ChatEmptyContent>
</template>

<style scoped lang="scss">
.message-item {
  padding: 24px var(--message-box-padding);
  border-bottom: 1px solid #d9d9e3;
  .user {
    color: rgb(52, 53, 65);
  }
  .message-item-avatar-panel {
    position: relative;
    .message-item-avatar {
      width: var(--message-item-avatar-width);
      height: var(--message-item-avatar-width);
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
      border-radius: 2px;
      float: left;
      margin-right: 16px;
    }
    .message-item-avatar-icon {
      position: relative;
      top: 3px;
      left: 4px;
    }
  }
  .message-item-content {
    float: left;
    width: calc(100% - var(--message-item-avatar-width) - 16px - var(--message-item-button-panel-width));
  }
  .message-item-button-panel {
    width: var(--message-item-button-panel-width);
    float: left;
  }
}
</style>
