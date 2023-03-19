import { Configuration, OpenAIApi } from 'openai'
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse
} from 'openai/api'
import { GptModel } from '@/model/commonConstant'
import { ElMessage } from 'element-plus'
import { getApiKey } from '@/store'
import { AxiosError } from 'axios'

const timeout = 90 * 1000
function getApi() {
  return new OpenAIApi(
    new Configuration({
      apiKey: getApiKey()
    })
  )
}

export function sendChatMessageByUser(content: string): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    sendChatMessage(ChatCompletionRequestMessageRoleEnum.User, content)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendChatMessage(
  role: ChatCompletionRequestMessageRoleEnum,
  content: string
): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    sendMessage(GptModel.GPT_35_TURBO, role, content)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendMessage(
  model: GptModel,
  role: ChatCompletionRequestMessageRoleEnum,
  content: string
): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    sendBatchMessage(model, [{ role, content }])
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

export function sendChatBatchMessageByUser(contents: string[]): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    const messages = []
    for (const content of contents) {
      messages.push({ role: ChatCompletionRequestMessageRoleEnum.User, content })
    }
    sendChatBatchMessage(messages)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendChatBatchMessage(
  messages: Array<ChatCompletionRequestMessage>
): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    sendBatchMessage(GptModel.GPT_35_TURBO, messages)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendBatchMessage(
  model: GptModel,
  messages: Array<ChatCompletionRequestMessage>
): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    send({ model, messages })
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function send(request: CreateChatCompletionRequest): Promise<CreateChatCompletionResponse> {
  return new Promise((resolve, reject) => {
    if (!getApiKey()) {
      ElMessage({
        message: '使用前，请先前往设置页面配置API Key',
        grouping: true,
        type: 'error'
      })
      reject()
      return
    }

    getApi()
      .createChatCompletion(request, { timeout })
      .then(res => resolve(res.data))
      .catch(err => {
        showErrMsg(err)
        reject(err)
      })
  })
}

function showErrMsg(err: AxiosError) {
  let errMsg = ''
  if (err) {
    if (err.response) {
      if (err.response.status === 400) {
        if (err.response.data && err.response.data.error) {
          if (err.response.data.error.code === 'context_length_exceeded') {
            errMsg = '超出此模型的最大上下文长度限制，请适当删减消息或重启（清空）会话。'
          }
        }
      } else if (err.response.status === 401) {
        errMsg =
          'API Key不正确，请检查OpenAI配置或生成一个新的，前往 https://platform.openai.com/account/api-keys 查看API Keys。'
      } else if (err.response.status === 404) {
        if (err.response.data?.error?.message === 'That model does not exist') {
          errMsg = '错误请求，模型不存在。'
        } else {
          errMsg = '错误请求，请检查请求相关信息。'
        }
      } else if (err.response.status === 429) {
        const message = (err.response as any).message
        if (message.indexOf('exceeded') >= 0) {
          errMsg =
            '超出了当前配额，请检查账单明细，前往 https://platform.openai.com/account/billing/overview 查看账单。'
        } else if (message.indexOf('overloaded') >= 0) {
          errMsg = '服务器过载，请稍后再试。'
        } else {
          errMsg = '触发限流，请稍后再试。'
        }
      } else if (err.response.status === 500) {
        errMsg = '服务异常，前往 https://status.openai.com/ 查看服务状态。'
      }
    } else {
      if (err.message === 'Network Error' || err.code === 'ECONNABORTED') {
        errMsg = '网络连接异常，请检查网络。'
      }
    }
  }

  if (errMsg) {
    ElMessage({
      message: errMsg,
      grouping: true,
      type: 'error'
    })
  }
}
