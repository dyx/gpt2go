export default {
  common: {
    copiedTipText: '复制成功',
    closeDialogTipText: '关闭窗口'
  },
  api: {
    emptyApiKeyError: '使用前，请先前往设置页面配置API Key',
    contextLengthExceededError: '超出此模型的最大上下文长度限制，请适当删减消息或重启（清空）会话。',
    incorrectApiKeyError:
      'API Key不正确，请检查OpenAI配置或生成一个新的，前往 https://platform.openai.com/account/api-keys 查看API Keys。',
    modelNotExistError: '错误请求，模型不存在。',
    requestError: '错误请求，请检查请求相关信息。',
    exceededQuotaError:
      '超出了当前配额，请检查账单明细，前往 https://platform.openai.com/account/billing/overview 查看账单。',
    serverOverloadedError: '服务器过载，请稍后再试。',
    rateLimitsError: '触发限流，请稍后再试。',
    serverError: '服务异常，前往 https://status.openai.com/ 查看服务状态。',
    connectionAbortedError: '网络连接异常，请检查网络。'
  },
  homepage: {
    model: {
      title: '模型',
      modelReferenceTipText: '模型参考：',
      priceReferenceTipText: '价格参考：',
      modelCol: '模型',
      promptPricingCol: '提示价格/1000tokens',
      completionPricingCol: '完成价格/1000tokens',
      maxTokensCol: '最大Token数',
      trainingDataCol: '训练数据截止日期'
    },
    rateLimits: {
      title: '限流',
      rateLimitsReference: '限流参考：',
      titleTip1: 'RPM为每分钟请求数',
      titleTip2: 'TPM为每分钟token数',
      userTypeCol: '用户类型',
      userTypeColValue1: '免费试用用户',
      userTypeColValue2: '付费用户（前48小时）',
      userTypeColValue3: '付费用户（48小时后）'
    }
  },
  chatGpt: {
    message: {
      clearConfirmText: '确定要清空会话吗？',
      deleteConfirmText: '确定要删除该对话吗？',
      totalTokenTipText: '总消耗token数量',
      currentTokenTipText: '本次消耗token数量',
      sendShortcutKeysTipText: '发送',
      newLineShortcutKeysTipText: '换行',
      empty: {
        example: {
          title: '范例',
          text1: '用简单的术语解释量子计算',
          text2: '对一个10岁的生日有什么创意吗？',
          text3: '如何在Javascript中发出HTTP请求？'
        },
        capability: {
          title: '能力',
          text1: '记住用户在对话中早些时候说的话',
          text2: '允许用户提供后续更正',
          text3: '受过拒绝不当请求的训练'
        },
        limit: {
          title: '限制',
          text1: '可能偶尔会产生不正确的信息',
          text2: '可能偶尔会产生有害的说明或有偏见的内容',
          text3: '对2021年后的世界和事件了解有限'
        }
      }
    },
    export: {
      title: '导出会话',
      exportButtonTipText: '导出文件',
      filenameRuleMessage: '文件名必填',
      filenamePlaceholder: '请输入文件名',
      imageTypeLabel: '图片'
    },
    setting: {
      title: '会话参数设置',
      saveButtonTipText: '保存参数',
      modelFormItem: '模型',
      modelFormItemTipText1: 'GPT-3.5-Turbo 针对聊天进行了优化，成本仅为ext-davinci-003的1/10。最大Token限制：4096。',
      modelFormItemTipText2: 'GPT-4 能够执行更复杂的任务，并针对聊天进行了优化。最大Token限制：8192。',
      modelFormItemTipText3: 'GPT-4-32k 与基本gpt-4模式相同的功能，但上下文长度为4倍。最大Token限制：32768。',
      isIncludeContextFormItem: '连续对话',
      isIncludeContextFormItemSelectOption1: '是',
      isIncludeContextFormItemSelectOption2: '否',
      isIncludeContextFormItemTipText:
        '发送消息时将附带之前的对话信息发送，此功能开启有助于获得更智能的回答，但同时也将增大token的开销。',
      temperatureFormItem: '温度',
      temperatureFormItemTipText: '数值越大获得的回答越分散随机，数值越小获得的回答越集中确定。'
    }
  },
  naming: {
    tab0: {
      title: '人名',
      setting: {
        lastName: '姓',
        lastNameRuleMessage: '请输入一个或两个中文的姓氏',
        firstNameLength: '名(字数)',
        firstNameLengthValue1: '1个',
        firstNameLengthValue2: '2个',
        gender: '性别',
        genderSelectOption1: '男',
        genderSelectOption2: '女',
        corpusScope: '参考书籍',
        generateButtonText: '生成',
        tokenTipText: '本次消耗token数量'
      },
      generate: {
        nameCol: '姓名',
        pinyinCol: '拼音',
        strokesCol: '笔画数',
        relevantWordCol: '参考',
        meaningCol: '寓意'
      },
      errorTipText: '生成名字格式不正确，请重试。'
    }
  },
  guessThing: {
    setting: {
      type: '种类',
      typeSelectOption1: '动物',
      typeSelectOption2: '植物',
      answer: '答案',
      startButtonText: '开始',
      answerRuleMessage: '请输入15个及以内的字符'
    },
    game: {
      answerTipLabel: '答案：',
      roundTipLabel: '回合：',
      answerSelectOptionYes: '是',
      answerSelectOptionNo: '不是',
      answerSelectOptionCustom: '自定义',
      sendButtonText: '发送',
      restartTipText: '确定要重新开始吗？'
    }
  },
  setting: {
    title: '设置',
    theme: {
      title: '主题',
      selectOptionSystem: '跟随系统',
      selectOptionLight: '明亮',
      selectOptionDark: '暗黑'
    },
    language: {
      title: '语言'
    },
    about: {
      title: '关于',
      introduce1: '本网站提供了一系列基于OpenAI的API开发的工具，首次使用需要配置API Key。',
      introduce2: '本网站目前只调用了OpenAI接口，所有数据都存储在客户端的本地localStorage中。',
      introduce3: '目前网站还存在很多不足，正在积极开发完善中，欢迎使用和反馈。',
      email: '联系邮箱：'
    },
    updateLog: {
      title: '更新日志',
      newFeaturesType: '新功能',
      enhancementType: '优化',
      refactorType: '重构',
      BugFixesType: '问题修复',
      v100: {
        newFeaturesItem1:
          '聊天，聊天内容支持Markdown渲染、代码块渲染，支持复制删减对话，支持导出对话，支持参数连续对话和温度配置。',
        newFeaturesItem2: '起名，支持自定义参考书籍',
        newFeaturesItem3: '设置，支持API Key配置'
      },
      v110: {
        newFeaturesItem1: '首页，常用网址导航',
        newFeaturesItem2: '猜东西，和AI一起猜猜猜',
        enhancementItem1:
          '聊天，优化项目序号、代码、表格内容显示，增加分享对话功能，导出功能增加PNG图片文件类型，参数配置增加模型配置',
        enhancementItem2: '起名，优化prompt',
        enhancementItem3: '设置，更新日志修改排版'
      },
      v120: {
        newFeaturesItem1: '设置，支持主题切换、语言切换'
      }
    }
  },
  notFound: {
    notFoundWord: '未找到页面',
    returnHomeButtonText: '返回首页'
  },
  menu: {
    '10': '首页',
    '20': 'ChatGPT',
    '30': '起名',
    '40': '猜东西',
    '99': '设置'
  }
}
