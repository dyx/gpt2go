import { Configuration, OpenAIApi } from 'openai'
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
  CreateChatCompletionResponse
} from 'openai/api'
import { GptModelEnum } from '@/model/commonConstant'
import { ElMessage } from 'element-plus'
import { getApiKey } from '@/store'
import { AxiosError } from 'axios'
import i18n from '@/i18n'

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
    sendMessage(GptModelEnum.GPT_35_TURBO, role, content)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendMessage(
  model: GptModelEnum,
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
    sendBatchMessage(GptModelEnum.GPT_35_TURBO, messages)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}
export function sendBatchMessage(
  model: GptModelEnum,
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
        message: i18n.global.t('api.emptyApiKeyError'),
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
            errMsg = i18n.global.t('api.contextLengthExceededError')
          }
        }
      } else if (err.response.status === 401) {
        errMsg = i18n.global.t('api.incorrectApiKeyError')
      } else if (err.response.status === 404) {
        if (err.response.data?.error?.message === 'That model does not exist') {
          errMsg = i18n.global.t('api.modelNotExistError')
        } else {
          errMsg = i18n.global.t('api.requestError')
        }
      } else if (err.response.status === 429) {
        const message = (err.response as any).message
        if (message.indexOf('exceeded') >= 0) {
          errMsg = i18n.global.t('api.exceededQuotaError')
        } else if (message.indexOf('overloaded') >= 0) {
          errMsg = i18n.global.t('api.serverOverloadedError')
        } else {
          errMsg = i18n.global.t('api.rateLimitsError')
        }
      } else if (err.response.status === 500) {
        errMsg = i18n.global.t('api.serverError')
      }
    } else {
      if (err.message === 'Network Error' || err.code === 'ECONNABORTED') {
        errMsg = i18n.global.t('api.connectionAbortedError')
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
