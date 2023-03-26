<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HOME_ROUTE } from '@/model/commonConstant'

const router = useRouter()

const handleReturnHomeClick = () => {
  router.push(HOME_ROUTE)
}
</script>

<template>
  <div class="not-found-box">
    <el-row>
      <el-col style="text-align: center"> <div class="not-found-number">404</div> </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align: center; margin-top: 16px">
        <span class="not-found-word">{{ $t('notFound.notFoundWord') }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="text-align: center; margin-top: 16px">
        <el-button type="primary" @click="handleReturnHomeClick">{{ $t('notFound.returnHomeButtonText') }}</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.not-found-box {
  position: absolute;
  width: 300px;
  left: calc(50% - 150px);
  top: 30%;
}
.not-found-number {
  background: -webkit-linear-gradient(315deg, var(--el-color-primary) 25%, var(--el-color-success));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 96px;
  line-height: 72px;
}
.not-found-word {
  color: var(--el-text-color-secondary);
}
</style>
