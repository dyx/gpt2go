<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { send } from '@/api'
import { GptModel, NAME_CORPUS_SCOPE } from '@/model/commonConstant'
import cnchar from 'cnchar'

interface NamingNameModel {
  name: string
  pinyin: string
  strokes: string
  source?: string
  relevantWord?: string
  meaning?: string
}

const requestingRef = ref(false)
const formRef = ref<FormInstance>()
const tokenRef = ref(0)
const formModelRef = ref({
  lastName: '',
  firstNameLength: 2,
  gender: '男',
  corpusScope: []
})
const rulesRef = ref<FormRules>({
  lastName: [
    {
      required: true,
      message: '请输入一个或两个中文的姓氏',
      pattern: /^[\u4e00-\u9fa5]{1,2}$/,
      trigger: 'blur'
    }
  ]
})
const resultDataRef = ref([] as NamingNameModel[])

const handleGenerateClick = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      let content = '假设你是一个取名大师，现在请你帮忙取名字。'
      let corpusScope = ''
      const formModel = formModelRef.value
      if (formModel.corpusScope && formModel.corpusScope.length > 0) {
        corpusScope = `资料范围在[${formModel.corpusScope}]范围内，`
      }
      content += `必须满足的条件如下：姓${formModel.lastName}，姓名总字数为${
        formModel.lastName.length + formModel.firstNameLength
      }个，性别${formModel.gender}，${corpusScope}生成5个名字。`
      content += '另外名字最好书写容易拼写和发音，与性别相符，有积极的含义，容易记忆，尽量不要与名人重名。'
      content += `输出形式只有JSON数组，格式[{"name": "", "source": "", "relevantWord": "", "meaning": ""}]，格式解释：[name为姓名] [source为出处] [relevantWord为相关字所在段落] [meaning为寓意]`
      requestingRef.value = true
      send({
        model: GptModel.GPT_35_TURBO,
        messages: [{ role: ChatCompletionRequestMessageRoleEnum.System, content }],
        temperature: 0.6
      })
        .then(res => {
          try {
            resultDataRef.value = JSON.parse(res.choices[0].message?.content as string)
            for (let item of resultDataRef.value) {
              item.pinyin = cnchar.spell(item.name, 'tone') as string
              const strokeArray: number[] = cnchar.stroke(item.name, 'array') as number[]
              item.strokes = `${strokeArray.join(' + ')} = ${cnchar.stroke(item.name) as number}`
            }
            tokenRef.value = res.usage?.total_tokens as number
          } catch (e) {
            ElMessage({
              message: '生成名字失败，请重试。',
              grouping: true,
              type: 'error'
            })
          }
        })
        .finally(() => {
          requestingRef.value = false
        })
    }
  })
}
</script>

<template>
  <div class="naming-name-panel">
    <div style="width: 30%; float: left">
      <el-card>
        <el-form ref="formRef" :model="formModelRef" :rules="rulesRef" label-width="70px">
          <el-form-item label="姓" prop="lastName">
            <el-input v-model="formModelRef.lastName" minlength="1" maxlength="2" />
          </el-form-item>
          <el-form-item label="名(字数)" prop="firstNameLength">
            <el-radio-group v-model="formModelRef.firstNameLength">
              <el-radio-button :label="1">1个</el-radio-button>
              <el-radio-button :label="2">2个</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="formModelRef.gender">
              <el-radio-button label="男">男</el-radio-button>
              <el-radio-button label="女">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="参考书籍" v-model="formModelRef.corpusScope">
            <el-select multiple v-model="formModelRef.corpusScope" style="width: 100%">
              <el-option v-for="(item, index) in NAME_CORPUS_SCOPE" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :loading="requestingRef" type="primary" @click="handleGenerateClick">生成</el-button>
            <el-tooltip content="本次消耗token数量" :show-after="1500">
              <el-tag
                v-show="!requestingRef && tokenRef > 0"
                size="large"
                type="info"
                style="position: absolute; right: 0; margin-left: 8px"
              ><el-icon size="14"><Coin /></el-icon
              ><span style="position: relative; top: -2px; left: 4px">{{ tokenRef }}</span></el-tag
              >
            </el-tooltip>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div style="height: calc(100vh - 56px); width: calc(70% - 16px); float: left; margin-left: 16px">
      <el-scrollbar>
        <div v-show="requestingRef">
          <el-skeleton animated style="width: 100%">
            <template #template>
              <el-row>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
          <el-skeleton animated style="width: 100%; margin-top: 48px">
            <template #template>
              <el-row>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
          <el-skeleton animated style="width: 100%; margin-top: 48px">
            <template #template>
              <el-row>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
                <el-col :span="8"
                  ><el-skeleton-item variant="p" style="width: 80%; height: var(--name-skeleton-item-height)"
                /></el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" style="width: 50%; height: var(--name-skeleton-item-height)" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
        </div>
        <div v-show="!requestingRef">
          <el-card v-for="(item, index) in resultDataRef" :key="'name-card-' + index" style="margin-bottom: 16px">
            <el-row>
              <el-col :span="8">
                <span class="result-label">姓名</span><span class="result-value">{{ item.name }}</span>
              </el-col>
              <el-col :span="8">
                <span class="result-label">拼音</span><span class="result-value">{{ item.pinyin }}</span>
              </el-col>
              <el-col :span="8">
                <span class="result-label">笔画数</span><span class="result-value">{{ item.strokes }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
              <el-col>
                <span class="result-label">出处</span>
                <span class="result-value" style="font-size: 18px">{{ item.source + '' + item.relevantWord }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
              <el-col>
                <span class="result-label">寓意</span>
                <span class="result-value" style="font-size: 18px">{{ item.meaning }}</span>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<style scoped>
.naming-name-panel {
  --name-skeleton-item-height: 28px;
}
.result-label {
  color: var(--el-color-info);
  margin-right: 8px;
  font-size: 14px;
}
.result-value {
  font-weight: bold;
  font-size: 20px;
}
</style>
