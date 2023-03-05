<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { send } from '@/api'
import { marked } from 'marked'
import { Download, Delete, Setting } from '@element-plus/icons-vue'
import hljs from 'highlight.js'
import { deleteMessage, getChatSetting, getMessageList, setMessageList } from '@/store'
import { MessageModel } from '@/model/commonModel'
import CountUp from 'vue-countup-v3'
import ChatSetting from '@/views/chat/ChatSetting.vue'
import { GptModel } from '@/model/commonConstant'
import ChatExport from '@/views/chat/ChatExport.vue'

const messageBoxRef = ref()
const messageListScrollBarRef = ref()
const messageListRef = ref()
const messageModelListRef = ref([] as MessageModel[])
const promptRef = ref('')
const totalTokenRef = ref(0)
const currentTokenRef = ref(0)
const requestingRef = ref(false)
const chatSettingVisible = ref(false)
const chatExportVisible = ref(false)

const init = () => {
  messageModelListRef.value = getMessageList()
  setToken(messageModelListRef.value)
}
const setToken = (messages: MessageModel[]) => {
  let totalToken = 0
  let currentToken = 0
  for (let i = 0; i < messages.length; i++) {
    const messageModel = messages[i]
    const token = messageModel.token as number
    if (i >= messages.length - 2) {
      currentToken += token
    }
    totalToken += token
  }
  totalTokenRef.value = totalToken
  currentTokenRef.value = currentToken
}
const handleSendMessageClick = () => {
  if (requestingRef.value) {
    return
  }
  if (!promptRef.value) {
    return
  }

  const chatSettingModel = getChatSetting()
  let messages: Array<ChatCompletionRequestMessage> = []
  if (chatSettingModel.isIncludeContext) {
    for (const messageModel of getMessageList()) {
      messages.push({
        role: messageModel.role as ChatCompletionRequestMessageRoleEnum,
        content: messageModel.content
      })
    }
  }
  messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: promptRef.value })

  requestingRef.value = true

  send({
    model: GptModel.GPT_35_TURBO,
    messages,
    temperature: chatSettingModel.temperature
  })
    .then(res => {
      console.log(res)
      messageModelListRef.value.push({
        id: res.id + '-prompt',
        created: res.created,
        model: res.model,
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: promptRef.value,
        token: res.usage?.prompt_tokens
      })
      messageModelListRef.value.push({
        id: res.id,
        created: res.created,
        model: res.model,
        role: res.choices[0].message?.role as string,
        content: res.choices[0].message?.content as string,
        choicesIndex: res.choices[0].index,
        token: res.usage?.completion_tokens
      })
      setMessageList(messageModelListRef.value)
      setToken(messageModelListRef.value)
      promptRef.value = ''
      nextTick(() => {
        let offsetTop = messageListRef.value.querySelector('.message-item:nth-last-of-type(2)').offsetTop
        messageListScrollBarRef.value!.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
        messageBoxRef.value.focus()
      })
    })
    .finally(() => (requestingRef.value = false))
}
const handleMessageDeleteClick = (id: string) => {
  deleteMessage(id)
  init()
}
const handleMessageCopyClick = (content: string) => {
  if (content) {
    navigator.clipboard.writeText(content)
    ElMessage({
      message: '复制成功',
      grouping: true,
      type: 'info'
    })
  }
}
const handleClearSessionClick = () => {
  ElMessageBox.confirm('确定要清空会话吗？').then(() => {
    setMessageList([])
    init()
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
  messageBoxRef.value.focus()
})

init()
</script>

<template>
  <div class="message-panel">
    <div class="message-list-panel">
      <el-scrollbar ref="messageListScrollBarRef">
        <div style="position: fixed; right: 0; margin: 8px">
          <el-tooltip content="清空会话" :show-after="1500">
            <el-button
              type="primary"
              style="position: relative"
              size="small"
              :icon="Delete"
              circle
              @click="handleClearSessionClick"
            />
          </el-tooltip>
          <el-tooltip content="导出会话" :show-after="1500">
            <el-button
              type="primary"
              style="position: relative"
              size="small"
              :icon="Download"
              circle
              @click="chatExportVisible = true"
            />
          </el-tooltip>
          <el-tooltip content="设置" :show-after="1500">
            <el-button
              type="primary"
              style="position: relative"
              size="small"
              :icon="Setting"
              circle
              @click="chatSettingVisible = true"
            />
          </el-tooltip>
        </div>
        <div ref="messageListRef">
          <div
            v-for="item in messageModelListRef"
            :key="item.id"
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
            <div class="message-item-content" v-highlight v-html="marked.parse(item.content)"></div>
            <div class="message-item-button-panel">
              <el-popconfirm
                v-if="item.role === ChatCompletionRequestMessageRoleEnum.User"
                width="200px"
                title="确定要删除该对话吗？"
                @confirm="handleMessageDeleteClick(item.id)"
              >
                <template #reference>
                  <div>
                    <el-tooltip content="删除对话" :show-after="1500">
                      <el-icon size="16px" class="message-item-button"><Delete /></el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-popconfirm>
              <el-tooltip
                v-if="item.role === ChatCompletionRequestMessageRoleEnum.Assistant"
                content="复制对话"
                :show-after="1500"
              >
                <el-icon size="16px" class="message-item-button" @click="handleMessageCopyClick(item.content)"
                  ><CopyDocument
                /></el-icon>
              </el-tooltip>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="message-box-panel">
      <div class="message-box-info">
        <el-tag type="info" size="small">
          <el-icon size="14" style="position: relative; top: 3px"><Coin /></el-icon>
          <el-tooltip content="总消耗token数量" :show-after="1500">
            <count-up
              style="display: inline-block; margin-left: 2px"
              :duration="1.5"
              :end-val="totalTokenRef"
            ></count-up>
          </el-tooltip>
          <el-tooltip content="本次消耗token数量" :show-after="1500">
            <span v-show="currentTokenRef > 0" style="margin-left: 4px; color: var(--el-color-primary)">
              +{{ currentTokenRef }}
            </span>
          </el-tooltip>
        </el-tag>
      </div>
      <el-input
        ref="messageBoxRef"
        :disabled="requestingRef"
        show-word-limit
        :maxlength="2000"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
        v-model="promptRef"
        type="textarea"
        class="message-box"
        @keydown.enter.exact.prevent="handleSendMessageClick"
      >
      </el-input>
      <el-icon v-if="requestingRef" size="16" class="message-box-button message-box-loading" style="bottom: 52px"
        ><Loading
      /></el-icon>
      <el-icon v-else size="16" class="message-box-button" @click="handleSendMessageClick"><Promotion /></el-icon>
      <div class="message-box-tip">
        <span style="margin-right: 8px"><span style="font-weight: bold">enter</span> 发送</span>
        <span><span style="font-weight: bold">shift+enter</span> 换行</span>
      </div>
    </div>
    <ChatSetting v-model="chatSettingVisible"></ChatSetting>
    <ChatExport v-model="chatExportVisible"></ChatExport>
  </div>
</template>

<style scoped>
:deep(.el-textarea__inner) {
  box-shadow: none;
  border-radius: 8px;
  padding: 12px 72px 12px 16px;
  font-size: 16px;
}
:deep(.el-input__count) {
  right: 12px;
  bottom: 4px;
  color: rgb(142, 142, 160);
  user-select: none;
}
:deep(.el-textarea__inner::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
  margin: 0;
  padding: 0;
}
:deep(.el-textarea__inner::-webkit-scrollbar-track) {
  background-color: #ffffff;
}
:deep(.el-textarea__inner::-webkit-scrollbar-thumb) {
  background-color: rgba(217, 217, 227, 0.8);
  border-radius: 4px;
  border: 1px solid #ffffff;
}
:deep(.el-textarea__inner::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(236, 236, 241, 0.8);
}
:deep(.el-textarea__inner::-webkit-scrollbar-thumb:active) {
  background-color: rgba(236, 236, 241, 0.8);
}
.el-button + .el-button {
  margin-left: 8px;
}
.message-panel {
  height: 100vh;
  --message-box-panel-height: 136px;
  --message-box-padding: 20%;
  --message-item-avatar-width: 24px;
  --message-item-button-panel-width: 60px;
}
.message-list-panel {
  height: calc(100vh - var(--message-box-panel-height));
}
.message-item {
  padding: 24px var(--message-box-padding);
  border-bottom: 1px solid #d9d9e3;
}
.message-item-avatar-panel {
  position: relative;
}
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
.message-item-content {
  float: left;
  width: calc(100% - var(--message-item-avatar-width) - 16px - var(--message-item-button-panel-width));
}
.message-item-content ol li::marker {
  text-indent: 16px;
}
.message-item-button-panel {
  width: var(--message-item-button-panel-width);
  float: left;
  text-align: right;
}
.message-item-button {
  padding: 4px;
  cursor: pointer;
}
.message-item-button:hover {
  background-color: rgb(236, 236, 241);
  border-radius: 4px;
}
.message-box-panel {
  position: relative;
  height: var(--message-box-panel-height);
  padding: 0 var(--message-box-padding);
}
.message-box-info {
  position: absolute;
  bottom: 98px;
}
.message-box {
  width: calc(100% - var(--message-box-padding) * 2);
  position: absolute;
  bottom: 40px;
  box-shadow: 0 0 transparent, 0 0 transparent, 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
.message-box-button {
  position: absolute;
  padding: 4px;
  right: calc(var(--message-box-padding) + 12px);
  bottom: 60px;
  cursor: pointer;
  color: rgb(142, 142, 160);
}
.message-box-button:hover {
  background-color: rgb(236, 236, 241);
  border-radius: 4px;
}
.message-box-tip {
  width: calc(100% - var(--message-box-padding) * 2);
  position: absolute;
  bottom: 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}
.message-box-loading {
  animation: loading-spin 2s linear infinite;
}
@keyframes loading-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
