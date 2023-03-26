import {
  STORAGE_KEY_API_KEY,
  STORAGE_KEY_CHAT_MESSAGE_LIST,
  STORAGE_KEY_CHAT_SETTING,
  STORAGE_KEY_GUESS_THING_ANSWER,
  STORAGE_KEY_GUESS_THING_MESSAGE_LIST,
  STORAGE_KEY_SETTING
} from '@/model/commonConstant'
import { ChatSettingModel, MessageModel, SettingModel } from '@/model/commonModel'

export function setApiKey(apiKey: string) {
  localStorage.setItem(STORAGE_KEY_API_KEY, apiKey)
}
export function getApiKey() {
  const obj = localStorage.getItem(STORAGE_KEY_API_KEY)
  return obj ? obj : ''
}

export function setMessageList(messageList: MessageModel[]) {
  localStorage.setItem(STORAGE_KEY_CHAT_MESSAGE_LIST, JSON.stringify(messageList))
}
export function getMessageList(): MessageModel[] {
  const obj = localStorage.getItem(STORAGE_KEY_CHAT_MESSAGE_LIST)
  return obj ? JSON.parse(obj) : []
}
export function deleteMessage(id: string) {
  const messageList = getMessageList()
  const index = messageList.findIndex(item => item.id === id)
  if (index >= 0) {
    messageList.splice(index, 2)
    setMessageList(messageList)
  }
}
export function setChatSetting(model: ChatSettingModel) {
  localStorage.setItem(STORAGE_KEY_CHAT_SETTING, JSON.stringify(model))
}
export function getChatSetting() {
  const obj = localStorage.getItem(STORAGE_KEY_CHAT_SETTING)
  return obj ? JSON.parse(obj) : null
}

export function setGuessThingAnswer(answer: string) {
  localStorage.setItem(STORAGE_KEY_GUESS_THING_ANSWER, answer)
}
export function getGuessThingAnswer(): string {
  const obj = localStorage.getItem(STORAGE_KEY_GUESS_THING_ANSWER)
  return obj ? obj : ''
}
export function setGuessThingMessageList(messageList: MessageModel[]) {
  localStorage.setItem(STORAGE_KEY_GUESS_THING_MESSAGE_LIST, JSON.stringify(messageList))
}
export function getGuessThingMessageList(): MessageModel[] {
  const obj = localStorage.getItem(STORAGE_KEY_GUESS_THING_MESSAGE_LIST)
  return obj ? JSON.parse(obj) : []
}

export function setSetting(model: SettingModel) {
  if (model) {
    const oldModel = getSetting()
    if (model.themeMode) {
      oldModel.themeMode = model.themeMode
    }
    if (model.localeMode) {
      oldModel.localeMode = model.localeMode
    }
    localStorage.setItem(STORAGE_KEY_SETTING, JSON.stringify(oldModel))
  }
}
export function getSetting(): SettingModel {
  const obj = localStorage.getItem(STORAGE_KEY_SETTING)
  return obj ? JSON.parse(obj) : {}
}
