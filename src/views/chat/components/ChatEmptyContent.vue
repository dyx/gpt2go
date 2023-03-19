<script setup lang="ts"></script>

<template>
  <div class="empty-tip">
    <el-row :gutter="16">
      <el-col :span="8" class="title-row">
        <div>
          <div>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </div>
          <div>范例</div>
        </div>
        <div class="data-row">用简单的术语解释量子计算</div>
        <div class="data-row">对一个10岁的生日有什么创意吗？</div>
        <div class="data-row">如何在Javascript中发出HTTP请求？</div>
      </el-col>
      <el-col :span="8" class="title-row">
        <div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              height="24"
              width="24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              ></path>
            </svg>
          </div>
          <div>能力</div>
        </div>
        <div class="data-row">记住用户在对话中早些时候说的话</div>
        <div class="data-row">允许用户提供后续更正</div>
        <div class="data-row">受过拒绝不当请求的训练</div>
      </el-col>
      <el-col :span="8" class="title-row">
        <div>
          <div>
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>限制</div>
        </div>
        <div class="data-row">可能偶尔会产生不正确的信息</div>
        <div class="data-row">可能偶尔会产生有害的说明或有偏见的内容</div>
        <div class="data-row">对2021年后的世界和事件了解有限</div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.empty-tip {
  padding: 16% 20% 0;
  .title-row {
    color: var(--el-text-color-regular);
    text-align: center;
    font-size: 18px;
    margin-bottom: 8px;
  }
  .data-row {
    border-radius: 4px;
    margin-top: 8px;
    padding: 8px;
    font-size: 14px;
    color: var(--el-color-info);
    background: var(--el-fill-color);
  }
}
</style>
