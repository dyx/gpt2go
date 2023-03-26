import { I18nLanguage } from '@/model/commonConstant'

export interface MenuItemModel {
  code: string
  name: string
  path?: string
  icon?: string
  children?: MenuItemModel[]
}

export interface MessageModel {
  id?: string
  created?: number
  model?: string
  role: string
  content: string
  token?: number
  choicesIndex?: number
}

export interface ChatSettingModel {
  model: string
  isIncludeContext: boolean
  temperature: number
}

export interface ChatExportModel {
  filename?: string
  fileFormat?: string
}

export interface HomepageNavCardItemModel {
  label: string
  link: string
}

export interface SettingModel {
  themeMode?: string
  localeMode?: string
}
