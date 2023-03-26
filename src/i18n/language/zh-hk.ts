export default {
  common: {
    copiedTipText: '複製成功',
    closeDialogTipText: '關閉窗口'
  },
  api: {
    emptyApiKeyError: '使用 API 前，請先前往設定頁面配置 API Key。',
    contextLengthExceededError: '超出此模型的最大上下文長度限制，請適當刪減消息或重啟（清空）會話。',
    incorrectApiKeyError:
      'API Key 不正確，請檢查 OpenAI 配置或生成一個新的，前往 https://platform.openai.com/account/api-keys 查看 API Keys。',
    modelNotExistError: '錯誤請求，模型不存在。',
    requestError: '錯誤請求，請檢查請求相關信息。',
    exceededQuotaError:
      '超出了當前配額，請檢查帳單明細，前往 https://platform.openai.com/account/billing/overview 查看帳單。',
    serverOverloadedError: '服務器過載，請稍後再試。',
    rateLimitsError: '觸發限流，請稍後再試。',
    serverError: '服務異常，前往 https://status.openai.com/ 查看服務狀態。',
    connectionAbortedError: '網絡連接異常，請檢查網絡。'
  },
  homepage: {
    model: {
      title: '模型',
      modelReferenceTipText: '模型參考：',
      priceReferenceTipText: '價格參考：',
      modelCol: '模型',
      promptPricingCol: '提示價格/1000tokens',
      completionPricingCol: '完成價格/1000tokens',
      maxTokensCol: '最大Token數',
      trainingDataCol: '訓練數據截止日期'
    },
    rateLimits: {
      title: '限流',
      rateLimitsReference: '限流參考：',
      titleTip1: 'RPM為每分鐘請求數',
      titleTip2: 'TPM為每分鐘token數',
      userTypeCol: '用戶類型',
      userTypeColValue1: '免費試用用戶',
      userTypeColValue2: '付費用戶（前48小時）',
      userTypeColValue3: '付費用戶（48小時後）'
    }
  },
  chatGpt: {
    message: {
      clearConfirmText: '確定要清空會話嗎？',
      deleteConfirmText: '確定要刪除該對話嗎？',
      totalTokenTipText: '總消耗token數量',
      currentTokenTipText: '本次消耗token數量',
      sendShortcutKeysTipText: '發送',
      newLineShortcutKeysTipText: '換行',
      empty: {
        example: {
          title: '範例',
          text1: '用簡單的術語解釋量子計算',
          text2: '對一個10歲的生日有什麼創意嗎？',
          text3: '如何在Javascript中發出HTTP請求？'
        },
        capability: {
          title: '能力',
          text1: '記住用戶在對話中早些時候說的話',
          text2: '允許用戶提供後續更正',
          text3: '受過拒絕不當請求的訓練'
        },
        limit: {
          title: '限制',
          text1: '可能偶爾會產生不正確的信息',
          text2: '可能偶爾會產生有害的說明或有偏見的內容',
          text3: '對2021年後的世界和事件了解有限'
        }
      }
    },
    export: {
      title: '匯出對話',
      exportButtonTipText: '匯出檔案',
      filenameRuleMessage: '必須填寫檔名',
      filenamePlaceholder: '請輸入檔名',
      imageTypeLabel: '圖片'
    },
    setting: {
      title: '對話參數設定',
      saveButtonTipText: '儲存參數',
      modelFormItem: '模型',
      modelFormItemTipText1: 'GPT-3.5-Turbo針對對話進行了優化，成本僅為ext-davinci-003的1/10。最大Token限制：4096。',
      modelFormItemTipText2: 'GPT-4能夠執行更複雜的任務，並針對對話進行了優化。最大Token限制：8192。',
      modelFormItemTipText3: 'GPT-4-32k具有與基本GPT-4模式相同的功能，但上下文長度為4倍。最大Token限制：32768。',
      isIncludeContextFormItem: '連續對話',
      isIncludeContextFormItemSelectOption1: '是',
      isIncludeContextFormItemSelectOption2: '否',
      isIncludeContextFormItemTipText:
        '發送訊息時將附帶之前的對話資訊，此功能開啟有助於獲得更智能的回答，但同時也將增加Token的開銷。',
      temperatureFormItem: '溫度',
      temperatureFormItemTipText: '數值越大獲得的回答越分散隨機，數值越小獲得的回答越集中確定。'
    }
  },
  naming: {
    tab0: {
      title: '人名',
      setting: {
        lastName: '姓',
        lastNameRuleMessage: '請輸入一個或兩個中文的姓氏',
        firstNameLength: '名(字數)',
        firstNameLengthValue1: '1個',
        firstNameLengthValue2: '2個',
        gender: '性別',
        genderSelectOption1: '男',
        genderSelectOption2: '女',
        corpusScope: '參考書籍',
        generateButtonText: '生成',
        tokenTipText: '本次消耗token數量'
      },
      generate: {
        nameCol: '姓名',
        pinyinCol: '拼音',
        strokesCol: '筆劃數',
        relevantWordCol: '參考',
        meaningCol: '寓意'
      },
      errorTipText: '生成名字格式不正確，請重試。'
    }
  },
  guessThing: {
    setting: {
      type: '類型',
      typeSelectOption1: '動物',
      typeSelectOption2: '植物',
      answer: '答案',
      startButtonText: '開始',
      answerRuleMessage: '請輸入15個及以內的字符'
    },
    game: {
      answerTipLabel: '答案：',
      roundTipLabel: '回合：',
      answerSelectOptionYes: '是',
      answerSelectOptionNo: '不是',
      answerSelectOptionCustom: '自定義',
      sendButtonText: '發送',
      restartTipText: '確定要重新開始嗎？'
    }
  },
  setting: {
    title: '設置',
    theme: {
      title: '主題',
      selectOptionSystem: '跟隨系統',
      selectOptionLight: '明亮',
      selectOptionDark: '暗黑'
    },
    language: {
      title: '語言'
    },
    about: {
      title: '關於',
      introduce1: '本網站提供了一系列基於OpenAI的API開發工具，首次使用需要配置API Key。',
      introduce2: '本網站目前只調用了OpenAI接口，所有數據都存儲在客戶端的本地localStorage中。',
      introduce3: '目前網站還存在很多不足，正在積極開發完善中，歡迎使用和反饋。',
      email: '聯繫郵箱：'
    },
    updateLog: {
      title: '更新日誌',
      newFeaturesType: '新功能',
      enhancementType: '優化',
      refactorType: '重構',
      BugFixesType: '問題修復',
      v100: {
        newFeaturesItem1:
          '聊天，聊天內容支持Markdown渲染、代碼塊渲染，支持複製刪減對話，支持導出對話，支持參數連續對話和溫度配置。',
        newFeaturesItem2: '起名，支持自定義參考書籍',
        newFeaturesItem3: '設置，支持API Key配置'
      },
      v110: {
        newFeaturesItem1: '首頁，常用網址導航',
        newFeaturesItem2: '猜東西，和AI一起猜猜猜',
        enhancementItem1:
          '聊天，優化項目序號、代碼、表格內容顯示，增加分享對話功能，導出功能增加PNG圖片文件類型，參數配置增加模型配置',
        enhancementItem2: '起名，優化prompt',
        enhancementItem3: '設置，更新日誌修改排版'
      },
      v120: {
        newFeaturesItem1: '設置，支持主題切換、語言切換'
      }
    }
  },
  notFound: {
    notFoundWord: '未找到頁面',
    returnHomeButtonText: '返回首頁'
  },
  menu: {
    '10': '首頁',
    '20': 'ChatGPT',
    '30': '起名',
    '40': '猜東西',
    '99': '設置'
  }
}
