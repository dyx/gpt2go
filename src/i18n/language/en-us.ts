export default {
  common: {
    copiedTipText: 'copied.',
    closeDialogTipText: 'close dialog'
  },
  api: {
    emptyApiKeyError: 'Please configure an API Key in the settings page before using the API.',
    contextLengthExceededError:
      'Exceeded maximum context length for this model. Please delete some messages or clear the session.',
    incorrectApiKeyError:
      'Incorrect API Key. Please check your OpenAI configuration or generate a new key at https://platform.openai.com/account/api-keys.',
    modelNotExistError: 'Error requesting API: model does not exist.',
    requestError: 'Error requesting API. Please check your request information.',
    exceededQuotaError:
      'Exceeded current quota. Please check your billing details at https://platform.openai.com/account/billing/overview.',
    serverOverloadedError: 'Server overloaded. Please try again later.',
    rateLimitsError: 'Rate limit exceeded. Please try again later.',
    serverError: 'Service error. Please check the service status at https://status.openai.com/',
    connectionAbortedError: 'Network connection aborted. Please check your network.'
  },
  homepage: {
    model: {
      title: 'Model',
      modelReferenceTipText: 'Model Reference: ',
      priceReferenceTipText: 'Price Reference: ',
      modelCol: 'Model',
      promptPricingCol: 'Prompt Price / 1K tokens',
      completionPricingCol: 'Completion Price / 1K tokens',
      maxTokensCol: 'Max Tokens',
      trainingDataCol: 'Training Data'
    },
    rateLimits: {
      title: 'Rate Limits',
      rateLimitsReference: 'Rate Limits Reference: ',
      titleTip1: 'RPM requests per minute',
      titleTip2: 'TPM tokens per minute',
      userTypeCol: 'User Type',
      userTypeColValue1: 'Free trial users',
      userTypeColValue2: 'Pay-as-you-go users (first 48 hours)',
      userTypeColValue3: 'Pay-as-you-go users (after 48 hours)'
    }
  },
  chatGpt: {
    message: {
      clearConfirmText: 'Are you sure you want to clear the session?',
      deleteConfirmText: 'Are you sure you want to delete this conversation?',
      totalTokenTipText: 'Total tokens consumed',
      currentTokenTipText: 'Tokens consumed for this request',
      sendShortcutKeysTipText: 'Send',
      newLineShortcutKeysTipText: 'New line',
      empty: {
        example: {
          title: 'Examples',
          text1: 'Explain quantum computing in simple terms',
          text2: 'Got any creative ideas for a 10 year old’s birthday?',
          text3: 'How do I make an HTTP request in Javascript?'
        },
        capability: {
          title: 'Capabilities',
          text1: 'Remembers what user said earlier in the conversation',
          text2: 'Allows user to provide follow-up corrections',
          text3: 'Trained to decline inappropriate requests'
        },
        limit: {
          title: 'Limitations',
          text1: 'May occasionally generate incorrect information',
          text2: 'May occasionally produce harmful instructions or biased content',
          text3: 'Limited knowledge of world and events after 2021'
        }
      }
    },
    export: {
      title: 'Export Session',
      exportButtonTipText: 'export file',
      filenameRuleMessage: 'Filename is required',
      filenamePlaceholder: 'Please enter filename',
      imageTypeLabel: 'Image'
    },
    setting: {
      title: 'Session Parameters Setting',
      saveButtonTipText: 'save parameters',
      modelFormItem: 'Model',
      modelFormItemTipText1:
        'GPT-3.5-Turbo is optimized for chat and costs only 1/10 of ext-davinci-003. Maximum token limit: 4096.',
      modelFormItemTipText2:
        'GPT-4 is capable of performing more complex tasks and is optimized for chat. Maximum token limit: 8192.',
      modelFormItemTipText3:
        'GPT-4-32k has the same functionality as basic GPT-4 mode, but with a context length that is 4 times longer. Maximum token limit: 32768.',
      isIncludeContextFormItem: 'Continuous Conversation',
      isIncludeContextFormItemSelectOption1: 'Yes',
      isIncludeContextFormItemSelectOption2: 'No',
      isIncludeContextFormItemTipText:
        'When sending a message, include previous conversation information. Enabling this function can help obtain smarter answers, but it will also increase token consumption.',
      temperatureFormItem: 'Temperature',
      temperatureFormItemTipText:
        'The higher the value, the more scattered and random the answers obtained will be. The lower the value, the more focused and determined the answers obtained will be.'
    }
  },
  naming: {
    tab0: {
      title: 'Chinese Name',
      setting: {
        lastName: 'Last Name',
        lastNameRuleMessage: 'Please enter 1 to 2 Chinese characters.',
        firstNameLength: 'First Name',
        firstNameLengthValue1: '1 character',
        firstNameLengthValue2: '2 characters',
        gender: 'Gender',
        genderSelectOption1: 'Male',
        genderSelectOption2: 'Female',
        corpusScope: 'Reference',
        generateButtonText: 'Generate',
        tokenTipText: 'Token consumption for this operation'
      },
      generate: {
        nameCol: 'Name',
        pinyinCol: 'Pinyin',
        strokesCol: 'Number of Strokes',
        relevantWordCol: 'Reference',
        meaningCol: 'Meaning'
      },
      errorTipText: 'Invalid name format, please try again.'
    }
  },
  guessThing: {
    setting: {
      type: 'Type',
      typeSelectOption1: 'Animal',
      typeSelectOption2: 'Plant',
      answer: 'Answer',
      startButtonText: 'Start',
      answerRuleMessage: 'Please enter 15 or fewer characters'
    },
    game: {
      answerTipLabel: 'Answer: ',
      roundTipLabel: 'Round: ',
      answerSelectOptionYes: 'Yes',
      answerSelectOptionNo: 'No',
      answerSelectOptionCustom: 'Custom',
      sendButtonText: 'Send',
      restartTipText: 'Do you want to restart?'
    }
  },
  setting: {
    title: 'Setting',
    theme: {
      title: 'Theme',
      selectOptionSystem: 'System',
      selectOptionLight: 'Light',
      selectOptionDark: 'Dark'
    },
    language: {
      title: 'Language'
    },
    about: {
      title: 'About',
      introduce1: `This website provides a series of tools developed based on OpenAI's API, and an API Key needs to be configured for the first use.`,
      introduce2: `Currently, this website only calls OpenAI interfaces, and all data is stored in the client's local localStorage.`,
      introduce3:
        'There are still many shortcomings in the website, and active development and improvement are ongoing. Feedback is welcome and appreciated.',
      email: 'Contact Email:'
    },
    updateLog: {
      title: 'Update Log',
      newFeaturesType: 'New Features',
      enhancementType: 'Enhancement',
      refactorType: 'Refactor',
      BugFixesType: 'Bug Fixes',
      v100: {
        newFeaturesItem1:
          'Chat: support Markdown rendering and code block rendering for chat content, support copying and deleting conversations, exporting conversations, and configuring continuous conversation and temperature parameters.',
        newFeaturesItem2: 'Naming: support custom reference books',
        newFeaturesItem3: 'Setting: support API Key configuration'
      },
      v110: {
        newFeaturesItem1: 'Home Page: commonly used website navigation',
        newFeaturesItem2: 'Guessing Game: play games with AI',
        enhancementItem1:
          'Chat: optimize project numbering, code, and table content display, add sharing conversation function, export function add PNG image file type, and add model configuration to parameter configuration',
        enhancementItem2: 'Naming: optimize prompt',
        enhancementItem3: 'Setting: modify update log layout'
      },
      v120: {
        newFeaturesItem1: 'Setting: support theme and language switching'
      }
    }
  },
  notFound: {
    notFoundWord: 'Not found page.',
    returnHomeButtonText: 'Home'
  },
  menu: {
    '10': 'Homepage',
    '20': 'ChatGPT',
    '30': 'Naming',
    '40': 'Guessing Game',
    '99': 'Setting'
  }
}
