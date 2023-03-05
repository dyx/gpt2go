export interface MenuItemModel {
  code: string
  name: string
  path?: string
  icon?: string
  children?: MenuItemModel[]
}

export interface MessageModel {
  id: string
  created?: number
  model?: string
  role: string
  content: string
  token?: number
  choicesIndex?: number
}

export interface ChatSettingModel {
  isIncludeContext: boolean
  temperature: number
}

export interface ChatExportModel {
  filename?: string
  fileFormat?: string
}
