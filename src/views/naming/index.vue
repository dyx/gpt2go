<script setup lang="ts">
import { ref } from 'vue'
import Name from '@/views/naming/Name.vue'

const tabActiveName = ref(0)
</script>

<template>
  <div class="naming-panel">
    <el-tabs v-model="tabActiveName" style="padding: 0 16px">
      <el-tab-pane :label="$t('naming.tab0.title')" :name="0">
        <Name></Name>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.naming-panel {
}
</style>
