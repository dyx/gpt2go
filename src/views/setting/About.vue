<script setup lang="ts"></script>

<template>
  <el-card>
    <div class="card-header">
      <div class="indicator"></div>
      <span class="title">关于</span>
    </div>
    <div style="margin-top: 16px">
      <el-row>
        <el-col>本网站提供了一系列基于OpenAI的API开发的工具，首次使用需要配置API Key。</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>本网站目前只调用了OpenAI接口，所有数据都存储在客户端的本地localStorage中。</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>目前网站还存在很多不足，正在积极开发完善中，欢迎使用和反馈。</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>
          联系邮箱：<el-link href="mailto:gpt2go@skiff.com" :underline="false" style="position: relative; top: -3px">
            gpt2go@skiff.com
          </el-link>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<style scoped></style>
