export const HOME_ROUTE = '/homepage/index'

export const STORAGE_KEY_API_KEY = 'API_KEY'
export const STORAGE_KEY_CHAT_MESSAGE_LIST = 'CHAT_MESSAGE_LIST'
export const STORAGE_KEY_CHAT_SETTING = 'CHAT_SETTING'
export const STORAGE_KEY_GUESS_THING_ANSWER = 'GUESS_THING_ANSWER'
export const STORAGE_KEY_GUESS_THING_MESSAGE_LIST = 'GUESS_THING_MESSAGE_LIST'
export const STORAGE_KEY_SETTING = 'SETTING'

export const NAME_CORPUS_SCOPE = ['诗经', '楚辞', '论语', '唐诗', '宋词', '乐府诗词']

export enum GptModelEnum {
  GPT_35_TURBO = 'gpt-3.5-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k'
}

export enum ThemeModeEnum {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark'
}

export enum I18nLanguage {
  ZHCN = 'zh-cn',
  ZHHK = 'zh-hk',
  ENUS = 'en-us'
}
