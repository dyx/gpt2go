<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { send } from '@/api'
import { marked } from 'marked'
import { Download, Delete, Setting } from '@element-plus/icons-vue'
import { deleteMessage, getChatSetting, getMessageList, setMessageList } from '@/store'
import { MessageModel } from '@/model/commonModel'
import CountUp from 'vue-countup-v3'
import ChatSetting from '@/views/chat/ChatSetting.vue'
import ChatExport from '@/views/chat/ChatExport.vue'
import ChatShare from '@/views/chat/ChatShare.vue'
import ChatContent from '@/views/chat/components/ChatContent.vue'

const messageBoxRef = ref()
const messageListScrollBarRef = ref()
const messageListRef = ref()
const messageModelListRef = ref([] as MessageModel[])
const promptRef = ref('')
const totalTokenRef = ref(0)
const currentTokenRef = ref(0)
const requestingRef = ref(false)
const currentShareMessageModelListRef = ref([] as MessageModel[])
const chatSettingVisible = ref(false)
const chatExportVisible = ref(false)
const chatShareVisible = ref(false)

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
const appendPromptIdSuffix = (id: string) => {
  return `${id}-prompt`
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
    model: chatSettingModel.model,
    messages,
    temperature: chatSettingModel.temperature
  })
    .then(res => {
      messageModelListRef.value.push({
        id: appendPromptIdSuffix(res.id),
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
const handleMessageDeleteClick = (id: string | undefined) => {
  if (id) {
    deleteMessage(id)
    init()
  }
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
const handleMessageShareClick = (id: string | undefined) => {
  if (id) {
    const list = []
    for (let i = 0; i < messageModelListRef.value.length; i++) {
      const item = messageModelListRef.value[i]
      if (item.id === id) {
        list.push(item)
        list.push(messageModelListRef.value[i + 1])
      }
    }
    currentShareMessageModelListRef.value = list
    chatShareVisible.value = true
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
          <el-button
            type="primary"
            style="position: relative"
            size="small"
            :icon="Delete"
            circle
            @click="handleClearSessionClick"
          />
          <el-button
            type="primary"
            style="position: relative"
            size="small"
            :icon="Download"
            circle
            @click="chatExportVisible = true"
          />
          <el-button
            type="primary"
            style="position: relative"
            size="small"
            :icon="Setting"
            circle
            @click="chatSettingVisible = true"
          />
        </div>
        <div ref="messageListRef">
          <ChatContent show-operate-area :message-model-list="messageModelListRef">
            <template #operateArea="{ item }">
              <el-icon
                v-if="item.role === ChatCompletionRequestMessageRoleEnum.User"
                size="16px"
                class="message-item-button"
                @click="handleMessageShareClick(item.id)"
                ><Share
              /></el-icon>
              <el-popconfirm
                v-if="item.role === ChatCompletionRequestMessageRoleEnum.User"
                width="200px"
                title="确定要删除该对话吗？"
                @confirm="handleMessageDeleteClick(item.id)"
              >
                <template #reference>
                  <el-icon size="16px" class="message-item-button"><Delete /></el-icon>
                </template>
              </el-popconfirm>
              <el-icon
                v-if="item.role === ChatCompletionRequestMessageRoleEnum.Assistant"
                size="16px"
                class="message-item-button"
                @click="handleMessageCopyClick(item.content)"
                ><CopyDocument
              /></el-icon>
            </template>
          </ChatContent>
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
    <ChatExport v-model="chatExportVisible" :export-element="messageListRef"></ChatExport>
    <ChatShare v-model="chatShareVisible" :message-model-list="currentShareMessageModelListRef"></ChatShare>
  </div>
</template>

<style scoped lang="scss">
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
  --message-item-button-panel-width: 48px;
  .message-list-panel {
    height: calc(100vh - var(--message-box-panel-height));
  }
  .message-item-button {
    float: right;
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
