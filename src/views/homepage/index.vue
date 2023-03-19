<script setup lang="ts">
import NavCard from '@/views/homepage/NavCard.vue'
import { HomepageNavCardItemModel } from '@/model/commonModel'
import { TableColumnCtx } from 'element-plus'

interface HomepageModelModel {
  model: string
  promptPricing: number
  completionPricing: number
  maxTokens: number
  trainingData: string
  desc?: string
}

interface SpanMethodProps {
  row: HomepageModelModel
  column: TableColumnCtx<HomepageModelModel>
  rowIndex: number
  columnIndex: number
}

const promptsData: HomepageNavCardItemModel[] = [
  {
    label: 'Awesome ChatGPT Prompts',
    link: 'https://prompts.chat/'
  },
  {
    label: 'QuickRef ChatGPT Prompts',
    link: 'https://quickref.me/chatgpt'
  },
  {
    label: 'EmergentMind',
    link: 'https://www.emergentmind.com/'
  },
  {
    label: 'ChatGPT Shortcut',
    link: 'https://newzone.top/chatgpt/'
  }
]
const otherData: HomepageNavCardItemModel[] = [
  {
    label: 'HuggingFace',
    link: 'https://huggingface.co/'
  },
  {
    label: 'ChatExcel',
    link: 'https://chatexcel.com/'
  },
  {
    label: 'Visual ChatGPT',
    link: 'https://github.com/microsoft/visual-chatgpt'
  },
  {
    label: 'ChatGPT API',
    link: 'https://github.com/transitive-bullshit/chatgpt-api'
  },
  {
    label: 'ChatGPT API Free',
    link: 'https://github.com/ayaka14732/ChatGPTAPIFree'
  }
]
const openAIData: HomepageNavCardItemModel[] = [
  {
    label: 'API Docs',
    link: 'https://platform.openai.com/docs'
  },
  {
    label: 'Playground',
    link: 'https://platform.openai.com/playground'
  },

  {
    label: 'Cookbook',
    link: 'https://github.com/openai/openai-cookbook'
  },
  {
    label: 'Community',
    link: 'https://community.openai.com/'
  },
  {
    label: 'ChatGPT',
    link: 'https://chat.openai.com'
  },
  {
    label: 'Service Status',
    link: 'https://status.openai.com/'
  },
  {
    label: 'GPT-4 Technical Report',
    link: 'https://cdn.openai.com/papers/gpt-4.pdf'
  }
]
const modelTableData = [
  {
    model: 'gpt-4',
    promptPricing: 0.03,
    completionPricing: 0.06,
    maxTokens: 8192,
    trainingData: '2021-09',
    releaseDate: '2023-03-15',
    desc: 'More capable than any GPT-3.5 model, able to do more complex tasks, and optimized for chat. Will be updated with our latest model iteration.'
  },
  {
    model: 'gpt-4-32k',
    promptPricing: 0.06,
    completionPricing: 0.12,
    maxTokens: 32768,
    trainingData: '2021-09',
    releaseDate: '2023-03-15',
    desc: 'Same capabilities as the base gpt-4 mode but with 4x the context length. Will be updated with our latest model iteration.'
  },
  {
    model: 'gpt-3.5-turbo',
    promptPricing: 0.002,
    completionPricing: 0.002,
    maxTokens: 4096,
    trainingData: '2021-09',
    releaseDate: '2022-03-15',
    desc: 'Most capable GPT-3.5 model and optimized for chat at 1/10th the cost of text-davinci-003. Will be updated with our latest model iteration.'
  },
  {
    model: 'text-davinci-003',
    promptPricing: 0.02,
    completionPricing: 0.02,
    maxTokens: 4097,
    trainingData: '2021-06',
    releaseDate: '2022-03-15',
    desc: 'Can do any language task with better quality, longer output, and consistent instruction-following than the curie, babbage, or ada models. Also supports inserting completions within text.'
  },
  {
    model: 'code-davinci-002',
    promptPricing: 0.02,
    completionPricing: 0.02,
    maxTokens: 8001,
    trainingData: '2021-06',
    releaseDate: '2022-03-15',
    desc: 'Optimized for code-completion tasks.'
  }
]
const rateLimitTableData = [
  {
    userType: '免费试用用户',
    textRpm: 20,
    textTpm: 150000,
    chatRpm: 20,
    chatTpm: 40000,
    codexRpm: 20,
    codexTpm: 40000,
    editRpm: 20,
    editTpm: 150000
  },
  {
    userType: '付费用户（前48小时）',
    textRpm: 60,
    textTpm: 250000,
    chatRpm: 60,
    chatTpm: 60000,
    codexRpm: 20,
    codexTpm: 40000,
    editRpm: 20,
    editTpm: 150000
  },
  {
    userType: '付费用户（48小时后）',
    textRpm: 3500,
    textTpm: 350000,
    chatRpm: 3500,
    chatTpm: 90000,
    codexRpm: 20,
    codexTpm: 40000,
    editRpm: 20,
    editTpm: 150000
  }
]
const gpt4RateLimitTableData = [
  {
    model: 'gpt-4',
    type: 'RPM',
    count: 200
  },
  {
    model: 'gpt-4',
    type: 'TPM',
    count: 40000
  },
  {
    model: 'gpt-4-32k',
    type: 'RPM',
    count: 400
  },
  {
    model: 'gpt-4-32k',
    type: 'TPM',
    count: 80000
  }
]
const handleModelTableSpan = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (row.promptPricing === row.completionPricing) {
    if (columnIndex === 1) {
      return [1, 2]
    } else if (columnIndex === 2) {
      return [0, 0]
    }
  }
}
const handleRateLimitTableSpan = ({ row, column, rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex == 0) {
    if (rowIndex % 2 == 0) {
      return [2, 1]
    } else {
      return [0, 0]
    }
  }
}
const numberFormatter = (row: any, column: any, cellValue: any, index: number) => {
  return cellValue.toLocaleString()
}
</script>

<template>
  <div class="homepage-panel">
    <el-scrollbar :view-style="{ overflowX: 'hidden' }">
      <el-row :gutter="16">
        <el-col :span="8">
          <NavCard name="OpenAI" :data="openAIData"></NavCard>
        </el-col>
        <el-col :span="8">
          <NavCard name="Prompts" :data="promptsData"></NavCard>
        </el-col>
        <el-col :span="8">
          <NavCard name="Other" :data="otherData"></NavCard>
        </el-col>
      </el-row>
      <el-card style="margin-top: 16px">
        <div class="title-panel">
          <div class="indicator"></div>
          <span class="title">模型</span>
          <span class="tip">
            <el-popover :width="400" trigger="hover">
              <template #reference>
                <el-icon size="14"><InfoFilled /></el-icon>
              </template>
              <template #default>
                <ul class="tip-list">
                  <li>
                    <span>模型参考：</span>
                    <el-link target="_blank" href="https://platform.openai.com/docs/models"
                      >https://platform.openai.com/docs/models</el-link
                    >
                  </li>
                  <li>
                    <span>价格参考：</span>
                    <el-link target="_blank" href="https://openai.com/pricing">https://openai.com/pricing</el-link>
                  </li>
                </ul>
              </template>
            </el-popover>
          </span>
        </div>
        <el-table :data="modelTableData" :span-method="handleModelTableSpan">
          <el-table-column prop="model" label="模型" width="150" />
          <el-table-column sortable align="center" prop="promptPricing" label="提示价格/1000tokens" width="188">
            <template #default="scope"> ${{ scope.row.promptPricing }} </template>
          </el-table-column>
          <el-table-column sortable align="center" prop="completionPricing" label="完成价格/1000tokens" width="188">
            <template #default="scope"> ${{ scope.row.completionPricing }} </template>
          </el-table-column>
          <el-table-column sortable prop="maxTokens" label="最大Token数" width="144" />
          <el-table-column prop="trainingData" label="训练数据截止日期" />
        </el-table>
      </el-card>
      <el-card style="margin-top: 16px">
        <div class="title-panel">
          <div class="indicator"></div>
          <span class="title">限流</span>
          <span class="tip">
            <el-popover :width="464" trigger="hover">
              <template #reference>
                <el-icon size="14"><InfoFilled /></el-icon>
              </template>
              <template #default>
                <span>限流参考：</span>
                <el-link target="_blank" href="https://platform.openai.com/docs/guides/rate-limits">
                  https://platform.openai.com/docs/guides/rate-limits
                </el-link>
              </template>
            </el-popover>
          </span>
          <span class="desc">RPM为每分钟请求数</span>
          <span class="desc">TPM为每分钟token数</span>
        </div>
        <el-row :gutter="8" style="margin-top: 8px">
          <el-col :span="6">
            <el-table
              border
              style="margin-top: 20px"
              :show-header="false"
              :data="gpt4RateLimitTableData"
              :span-method="handleRateLimitTableSpan"
            >
              <el-table-column prop="model"></el-table-column>
              <el-table-column prop="type"></el-table-column>
              <el-table-column prop="count" :formatter="numberFormatter"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="18">
            <el-table table-layout="auto" :data="rateLimitTableData">
              <el-table-column prop="userType" label="用户类型" width="168" />
              <el-table-column align="center" label="TEXT & EMBEDDING">
                <el-table-column
                  align="center"
                  prop="textRpm"
                  label="RPM"
                  :formatter="numberFormatter"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="textTpm"
                  label="TPM"
                  :formatter="numberFormatter"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="CHAT">
                <el-table-column
                  align="center"
                  prop="chatRpm"
                  label="RPM"
                  :formatter="numberFormatter"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="chatTpm"
                  label="TPM"
                  :formatter="numberFormatter"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="CODEX">
                <el-table-column
                  align="center"
                  prop="codexRpm"
                  label="RPM"
                  :formatter="numberFormatter"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="codexTpm"
                  label="TPM"
                  :formatter="numberFormatter"
                ></el-table-column>
              </el-table-column>
              <el-table-column align="center" label="EDIT">
                <el-table-column
                  align="center"
                  prop="editRpm"
                  label="RPM"
                  :formatter="numberFormatter"
                ></el-table-column>
                <el-table-column
                  align="center"
                  prop="editTpm"
                  label="TPM"
                  :formatter="numberFormatter"
                ></el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.homepage-panel {
  height: calc(100vh - 32px);
  padding: 16px;
  .title-panel {
    .indicator {
      height: 16px;
      width: 8px;
      background-color: var(--el-color-primary);
      margin-right: 8px;
      position: relative;
      top: 1px;
      display: inline-block;
    }
    .title {
      font-size: 18px;
    }
    .tip {
      margin-left: 4px;
    }
    .desc {
      color: var(--el-color-info);
      margin-left: 8px;
      font-size: 14px;
    }
  }
}
.tip-list {
  li {
    list-style-type: disc;
    list-style-position: inside;
    margin-top: 8px;
  }
}
</style>
