<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules, InputInstance } from 'element-plus'
import { send } from '@/api'
import { GptModelEnum } from '@/model/commonConstant'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import confetti from 'canvas-confetti'
import { getGuessThingAnswer, getGuessThingMessageList, setGuessThingAnswer, setGuessThingMessageList } from '@/store'
import { str2ChatCompletionRequestMessageRoleEnum } from '@/utils/commonUtil'
import { RefreshRight } from '@element-plus/icons-vue'
import { MessageModel } from '@/model/commonModel'
import i18n from '@/i18n'

const guessThingListScrollBarRef = ref()
const guessThingContentElementRef = ref()
const startRequestingRef = ref(false)
const sendRequestingRef = ref(false)
const startFormRef = ref<FormInstance>()
const formModelRef = ref({
  guessMode: 'AI猜',
  category: '动物',
  correctAnswer: getGuessThingAnswer(),
  mode: 0.8
})
const replyRef = ref('是')
const customReplyInputRef = ref<InputInstance>()
const customReplyRef = ref('')
const resultDataRef = ref([] as MessageModel[])
const isStarted = ref(false)
const roundRef = ref(0)
const tokenRef = ref(0)
const latestTokenRef = ref(0)
const rulesRef = ref<FormRules>({
  correctAnswer: [
    {
      required: true,
      message: i18n.global.t('guessThing.setting.answerRuleMessage'),
      trigger: 'blur'
    }
  ]
})

const init = () => {
  resultDataRef.value = getGuessThingMessageList()
  isStarted.value = resultDataRef.value && resultDataRef.value.length > 0
  calcRoundAndToken()
}
const getInitPrompt = () => {
  if (formModelRef.value.guessMode === 'AI猜') {
    return `你将会扮演一个猜${formModelRef.value.category}游戏的选手，请时刻记住你是猜的角色。
        你通过向我提问的方式获取信息，提问尽量简洁，内容只能为是或不是类型的问题，每次只能提一个问题。
        如果猜到了答案，请以格式"是xxx吗"输出。
        现在请开始提问吧。`
  } else {
    return ``
  }
}
const setAnswerHighlight = (content: string) => {
  return content.replace(
    new RegExp(formModelRef.value.correctAnswer, 'gi'),
    `<span style="color: var(--el-color-primary);">${formModelRef.value.correctAnswer}</span>`
  )
}
const calcRoundAndToken = () => {
  let round = 0
  for (let item of resultDataRef.value) {
    if (item.role === ChatCompletionRequestMessageRoleEnum.Assistant) {
      round++
    }
  }
  roundRef.value = round

  let token = 0
  let latestToken = 0
  for (let i = 0; i < resultDataRef.value.length; i++) {
    const item = resultDataRef.value[i]
    token += item.token ? item.token : 0
    if (i >= resultDataRef.value.length - 2) {
      latestToken += item.token ? item.token : 0
    }
  }
  tokenRef.value = token
  latestTokenRef.value = latestToken
}
const handleStartClick = () => {
  startFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      const messageParam = {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: getInitPrompt()
      }
      startRequestingRef.value = true
      send({
        model: GptModelEnum.GPT_35_TURBO,
        messages: [messageParam],
        temperature: formModelRef.value.mode
      })
        .then(res => {
          try {
            resultDataRef.value.push({
              role: messageParam.role,
              content: messageParam.content,
              token: res.usage?.prompt_tokens
            })
            resultDataRef.value.push({
              role: ChatCompletionRequestMessageRoleEnum.Assistant,
              content: res.choices[0].message?.content as string,
              token: res.usage?.completion_tokens
            })
            isStarted.value = true
            setGuessThingAnswer(formModelRef.value.correctAnswer)
            setGuessThingMessageList(resultDataRef.value)
            calcRoundAndToken()
          } catch (e) {
            console.log(e)
            ElMessage({
              message: '发生错误',
              grouping: true,
              type: 'error'
            })
          }
        })
        .finally(() => {
          startRequestingRef.value = false
        })
    }
  })
}
const handleSendClick = () => {
  const content = replyRef.value === '自定义' ? customReplyRef.value : replyRef.value
  const messageParam = { role: ChatCompletionRequestMessageRoleEnum.User, content }
  const messages: ChatCompletionRequestMessage[] = []
  for (const item of resultDataRef.value) {
    messages.push({
      role: str2ChatCompletionRequestMessageRoleEnum(item.role),
      content: item.content
    })
  }
  messages.push(messageParam)
  sendRequestingRef.value = true
  send({
    model: GptModelEnum.GPT_35_TURBO,
    messages,
    temperature: formModelRef.value.mode
  })
    .then(res => {
      try {
        const content = res.choices[0].message?.content as string
        resultDataRef.value.push({
          role: messageParam.role,
          content: messageParam.content,
          token: res.usage?.prompt_tokens
        })
        resultDataRef.value.push({
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content,
          token: res.usage?.completion_tokens
        })
        setGuessThingMessageList(resultDataRef.value)
        if (replyRef.value === '自定义') {
          customReplyRef.value = ''
        }
        calcRoundAndToken()
        if (content.indexOf(formModelRef.value.correctAnswer) >= 0) {
          successEffect()
        }
        nextTick(() => {
          let offsetTop = guessThingContentElementRef.value.querySelector('.content-item:last-child').offsetTop
          guessThingListScrollBarRef.value!.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          })
        })
      } catch (e) {
        console.log(e)
        ElMessage({
          message: '发生错误',
          grouping: true,
          type: 'error'
        })
      }
    })
    .finally(() => {
      sendRequestingRef.value = false
    })
}
const handleResumeClick = () => {
  ElMessageBox.confirm(i18n.global.t('guessThing.game.restartTipText'))
    .then(() => {
      formModelRef.value.correctAnswer = ''
      resultDataRef.value = []
      isStarted.value = false
      setGuessThingAnswer('')
      setGuessThingMessageList([])
    })
    .catch(() => {})
}
const handleReplyChange = (value: string) => {
  if (value === '自定义') {
    nextTick(() => {
      customReplyInputRef.value?.focus()
    })
  }
}
const successEffect = () => {
  const confettiInstance = confetti.create(document.getElementById('guessThingConfettiCanvas') as HTMLCanvasElement, {
    resize: true,
    useWorker: true
  })
  confettiInstance({
    particleCount: 240,
    spread: 90,
    ticks: 300
  })
}

onMounted(() => {
  const rightPanel = document.getElementsByClassName('right-panel')[0]
  const canvas = document.getElementById('guessThingConfettiCanvas') as HTMLCanvasElement
  canvas.width = rightPanel.clientWidth
  canvas.height = rightPanel.clientHeight
})

init()
</script>

<template>
  <div class="guess-thing-panel">
    <div v-show="!isStarted" class="left-panel">
      <el-card>
        <el-form ref="startFormRef" :model="formModelRef" :rules="rulesRef" label-width="70px">
          <!--          <el-form-item label="模式" prop="firstNameLength">-->
          <!--            <el-radio-group v-model="formModelRef.guessMode">-->
          <!--              <el-radio-button label="AI猜">AI猜</el-radio-button>-->
          <!--              <el-radio-button label="我来猜">我来猜</el-radio-button>-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('guessThing.setting.type')" prop="firstNameLength">
            <el-radio-group v-model="formModelRef.category">
              <el-radio-button label="动物">{{ $t('guessThing.setting.typeSelectOption1') }}</el-radio-button>
              <el-radio-button label="植物">{{ $t('guessThing.setting.typeSelectOption2') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('guessThing.setting.answer')" prop="correctAnswer">
            <el-input maxlength="15" v-model="formModelRef.correctAnswer"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="startRequestingRef" type="primary" @click="handleStartClick">
              {{ $t('guessThing.setting.startButtonText') }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div v-show="isStarted" class="right-panel">
      <canvas id="guessThingConfettiCanvas"></canvas>
      <el-card style="height: calc(100vh - 34px)">
        <el-row class="header-panel">
          <el-col :span="18">
            <span class="tip-label">{{ $t('guessThing.game.answerTipLabel') }}</span>
            <el-tag round effect="plain">{{ formModelRef.correctAnswer }}</el-tag>
            <span class="tip-label">{{ $t('guessThing.game.roundTipLabel') }}</span>
            <el-tag round effect="plain">{{ roundRef }}</el-tag>
            <span class="tip-label">token: </span>
            <el-tag round effect="plain">{{ tokenRef }}</el-tag>
            <el-tag round effect="light" style="margin-left: 4px">+{{ latestTokenRef }}</el-tag>
          </el-col>
          <el-col :span="6" style="text-align: right">
            <el-button size="small" type="primary" @click="handleResumeClick" :icon="RefreshRight" circle> </el-button>
          </el-col>
        </el-row>
        <div class="content-panel">
          <el-scrollbar ref="guessThingListScrollBarRef">
            <div ref="guessThingContentElementRef">
              <template v-for="(item, index) in resultDataRef">
                <div
                  class="content-item"
                  v-if="
                    item.role === ChatCompletionRequestMessageRoleEnum.User ||
                    item.role === ChatCompletionRequestMessageRoleEnum.Assistant
                  "
                  :key="'guess-thing-content-' + index"
                  v-html="setAnswerHighlight(item.content)"
                ></div>
              </template>
            </div>
          </el-scrollbar>
        </div>
        <div class="operate-panel">
          <el-radio-group v-model="replyRef" style="position: relative; top: -4px" @change="handleReplyChange">
            <el-radio-button label="是">{{ $t('guessThing.game.answerSelectOptionYes') }}</el-radio-button>
            <el-radio-button label="不是">{{ $t('guessThing.game.answerSelectOptionNo') }}</el-radio-button>
            <el-radio-button label="自定义">{{ $t('guessThing.game.answerSelectOptionCustom') }}</el-radio-button>
          </el-radio-group>
          <el-input
            ref="customReplyInputRef"
            v-show="replyRef === '自定义'"
            v-model="customReplyRef"
            maxlength="15"
            style="width: 256px; margin-left: 8px; font-size: 12px"
            show-word-limit
          ></el-input>
          <el-button style="margin-left: 8px" :loading="sendRequestingRef" @click="handleSendClick">{{
            $t('guessThing.game.sendButtonText')
          }}</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
#guessThingConfettiCanvas {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 999;
}
.guess-thing-panel {
  position: relative;
  width: 100%;
  .left-panel {
    width: 30%;
  }
  .right-panel {
    .header-panel {
      margin-bottom: 8px;
      .tip-label:first-child {
        margin-left: 0;
      }
      .tip-label {
        font-size: 10px;
        color: var(--el-color-info);
        margin-left: 16px;
      }
    }
    .content-panel {
      height: calc(100vh - 147px);
      .content-item:first-child {
        margin-top: 0;
      }
      .content-item {
        margin-top: 16px;
        border-radius: 4px;
        padding: 8px 16px;
        color: var(--el-text-color);
        background: var(--el-fill-color-light);
      }
    }
    .operate-panel {
      position: relative;
      margin: 16px 0;
      text-align: center;
      height: 32px;
    }
  }
}
</style>
