<script setup lang="ts"></script>

<template>
  <el-card>
    <div class="card-header">
      <div class="indicator"></div>
      <span class="title">{{ $t('setting.about.title') }}</span>
    </div>
    <div style="margin-top: 16px">
      <el-row>
        <el-col>{{ $t('setting.about.introduce1') }}</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>{{ $t('setting.about.introduce2') }}</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>{{ $t('setting.about.introduce3') }}</el-col>
      </el-row>
      <el-row style="margin-top: 4px">
        <el-col>
          {{ $t('setting.about.email')
          }}<el-link href="mailto:gpt2go@skiff.com" :underline="false" style="position: relative; top: -3px">
            gpt2go@skiff.com
          </el-link>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<style scoped></style>
