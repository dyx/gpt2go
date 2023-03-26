<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { ChatCompletionRequestMessageRoleEnum } from 'openai/api'
import { send } from '@/api'
import { GptModelEnum, NAME_CORPUS_SCOPE } from '@/model/commonConstant'
import cnchar from 'cnchar'
import i18n from '@/i18n'

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
  mode: 0.6,
  gender: '男',
  corpusScope: []
})
const rulesRef = ref<FormRules>({
  lastName: [
    {
      required: true,
      message: i18n.global.t('naming.tab0.setting.lastNameRuleMessage'),
      pattern: /^[\u4e00-\u9fa5]{1,2}$/,
      trigger: 'blur'
    }
  ]
})
const resultDataRef = ref([] as NamingNameModel[])
const systemPrompt =
  '我想让你充当一个中文取名大师，现在请你帮忙取名字。我将为你提供包括"性别"、"名字长度"、"名字限定查找范围"和"生成名字个数"的输入形式。您的任务是使用这些输入形式，生成3组容易书写，与性别相符，有积极的含义，不要与历史人物重名的名字。不要在您的响应中包含任何解释或附加信息，只输出JSON数组，格式[{"name": "", "relevantWord": "", "meaning": ""}]，格式解释：[name为姓名] [relevantWord为取此名原因] [meaning为寓意]'

const handleGenerateClick = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      const formModel = formModelRef.value
      const corpusScope = formModel.corpusScope && formModel.corpusScope.length > 0 ? formModel.corpusScope : '不限定'
      let content = `性别=${formModel.gender} 名字长度=${formModel.firstNameLength} 名字限定查找范围=${corpusScope} 生成名字个数=3`
      requestingRef.value = true
      send({
        model: GptModelEnum.GPT_35_TURBO,
        messages: [
          { role: ChatCompletionRequestMessageRoleEnum.System, content: systemPrompt },
          { role: ChatCompletionRequestMessageRoleEnum.User, content }
        ],
        temperature: formModel.mode
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
              message: i18n.global.t('naming.tab0.errorTipText'),
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
    <div class="left-panel">
      <el-card>
        <el-form ref="formRef" :model="formModelRef" :rules="rulesRef" label-width="100px">
          <el-form-item :label="$t('naming.tab0.setting.lastName')" prop="lastName">
            <el-input v-model="formModelRef.lastName" minlength="1" maxlength="2" show-word-limit />
          </el-form-item>
          <el-form-item :label="$t('naming.tab0.setting.firstNameLength')" prop="firstNameLength">
            <el-radio-group v-model="formModelRef.firstNameLength">
              <el-radio-button :label="1">{{ $t('naming.tab0.setting.firstNameLengthValue1') }}</el-radio-button>
              <el-radio-button :label="2">{{ $t('naming.tab0.setting.firstNameLengthValue2') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('naming.tab0.setting.gender')" prop="gender">
            <el-radio-group v-model="formModelRef.gender">
              <el-radio-button label="男">{{ $t('naming.tab0.setting.genderSelectOption1') }}</el-radio-button>
              <el-radio-button label="女">{{ $t('naming.tab0.setting.genderSelectOption2') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <!--          <el-form-item label="模式" prop="mode">-->
          <!--            <el-radio-group v-model="formModelRef.mode">-->
          <!--              <el-radio-button :label="0.6">精确</el-radio-button>-->
          <!--              <el-radio-button :label="1">平衡</el-radio-button>-->
          <!--              <el-radio-button :label="1.2">有创造力</el-radio-button>-->
          <!--            </el-radio-group>-->
          <!--          </el-form-item>-->
          <el-form-item :label="$t('naming.tab0.setting.corpusScope')" v-model="formModelRef.corpusScope">
            <el-select multiple v-model="formModelRef.corpusScope" style="width: 100%">
              <el-option v-for="(item, index) in NAME_CORPUS_SCOPE" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :loading="requestingRef" type="primary" @click="handleGenerateClick">
              {{ $t('naming.tab0.setting.generateButtonText') }}
            </el-button>
            <el-tooltip :content="$t('naming.tab0.setting.tokenTipText')" :show-after="1500">
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
    <div class="right-panel">
      <el-scrollbar>
        <div v-show="requestingRef">
          <el-skeleton animated style="width: 100%">
            <template #template>
              <el-row>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
          <el-skeleton animated style="width: 100%; margin-top: 48px">
            <template #template>
              <el-row>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
          <el-skeleton animated style="width: 100%; margin-top: 48px">
            <template #template>
              <el-row>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
                <el-col :span="8"><el-skeleton-item variant="p" class="skeleton-item-80" /></el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
              <el-row style="margin-top: 16px">
                <el-col>
                  <el-skeleton-item variant="p" class="skeleton-item-50" />
                </el-col>
              </el-row>
            </template>
          </el-skeleton>
        </div>
        <div v-show="!requestingRef">
          <el-card v-for="(item, index) in resultDataRef" :key="'name-card-' + index" style="margin-bottom: 16px">
            <el-row>
              <el-col :span="8">
                <span class="result-label">{{ $t('naming.tab0.generate.nameCol') }}</span
                ><span class="result-value">{{ item.name }}</span>
              </el-col>
              <el-col :span="8">
                <span class="result-label">{{ $t('naming.tab0.generate.pinyinCol') }}</span
                ><span class="result-value">{{ item.pinyin }}</span>
              </el-col>
              <el-col :span="8">
                <span class="result-label">{{ $t('naming.tab0.generate.strokesCol') }}</span
                ><span class="result-value">{{ item.strokes }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
              <el-col>
                <span class="result-label">{{ $t('naming.tab0.generate.relevantWordCol') }}</span>
                <span class="result-value" style="font-size: 18px">{{ item.relevantWord }}</span>
              </el-col>
            </el-row>
            <el-row style="margin-top: 16px">
              <el-col>
                <span class="result-label">{{ $t('naming.tab0.generate.meaningCol') }}</span>
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

<style scoped lang="scss">
.naming-name-panel {
  --name-skeleton-item-height: 28px;
  .left-panel {
    width: 30%;
    float: left;
  }
  .right-panel {
    height: calc(100vh - 56px);
    width: calc(70% - 16px);
    float: left;
    margin-left: 16px;
  }
  .skeleton-item-50 {
    width: 80%;
    height: var(--name-skeleton-item-height);
  }
  .skeleton-item-80 {
    width: 80%;
    height: var(--name-skeleton-item-height);
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
}
</style>
