<script setup lang="ts">
import { HomepageNavCardItemModel } from '@/model/commonModel'

defineProps<{ name: string; data: HomepageNavCardItemModel[] }>()
</script>

<template>
  <el-card>
    <div class="title-panel">
      <div class="indicator"></div>
      <span class="title">{{ name }}</span>
    </div>
    <div class="body-panel">
      <div class="body" v-for="(item, index) in data" :key="'homepage-card-' + index">
        <div class="label">{{ item.label }}</div>
        <div class="link">
          <el-link target="_blank" :href="item.link">{{ item.link }}</el-link>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
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
}
.body-panel {
  .body {
    margin-top: 16px;
  }
  .link {
  }
  .label {
  }
}
</style>
