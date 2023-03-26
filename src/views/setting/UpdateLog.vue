<script setup lang="ts"></script>

<template>
  <el-card>
    <div class="card-header">
      <div class="indicator"></div>
      <span class="title">{{ $t('setting.updateLog.title') }}</span>
    </div>
    <div class="update-log-panel">
      <el-timeline>
        <el-timeline-item type="primary" timestamp="2022/03/26" placement="top">
          <el-card shadow="hover">
            <h3>v1.2.0</h3>
            <div class="log-content">
              <h4>{{ $t('setting.updateLog.newFeaturesType') }}</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>{{ $t('setting.updateLog.v120.newFeaturesItem1') }}</li>
              </ul>
            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/03/19" placement="top">
          <el-card shadow="hover">
            <h3>v1.1.0</h3>
            <div class="log-content">
              <h4>{{ $t('setting.updateLog.newFeaturesType') }}</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>{{ $t('setting.updateLog.v110.newFeaturesItem1') }}</li>
                <li>{{ $t('setting.updateLog.v110.newFeaturesItem2') }}</li>
              </ul>
            </div>
            <div class="log-content">
              <h4>{{ $t('setting.updateLog.enhancementType') }}</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>
                  {{ $t('setting.updateLog.v110.enhancementItem1') }}
                </li>
                <li>{{ $t('setting.updateLog.v110.enhancementItem2') }}</li>
                <li>{{ $t('setting.updateLog.v110.enhancementItem3') }}</li>
              </ul>
            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/03/05" placement="top">
          <el-card shadow="hover">
            <h3>v1.0.0</h3>
            <div class="log-content">
              <h4>{{ $t('setting.updateLog.newFeaturesType') }}</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>
                  {{ $t('setting.updateLog.v100.newFeaturesItem1') }}
                </li>
                <li>{{ $t('setting.updateLog.v100.newFeaturesItem2') }}</li>
                <li>{{ $t('setting.updateLog.v100.newFeaturesItem3') }}</li>
              </ul>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.update-log-panel {
  margin-top: 16px;
  .log-content {
    margin-top: 8px;
    .detail {
      list-style-position: inside;
      list-style-type: disc;
      li:first-child {
        margin-top: 0;
      }
      li {
        margin-top: 4px;
      }
    }
  }
}
</style>
