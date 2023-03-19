<script setup lang="ts"></script>

<template>
  <el-card>
    <div class="card-header">
      <div class="indicator"></div>
      <span class="title">更新日志</span>
    </div>
    <div class="update-log-panel">
      <el-timeline>
        <el-timeline-item type="primary" timestamp="2022/03/19" placement="top">
          <el-card shadow="hover">
            <h3>v1.1.0</h3>
            <div class="log-content">
              <h4>新功能</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>首页，常用网址导航</li>
                <li>猜东西，和AI一起猜猜猜</li>
              </ul>
            </div>
            <div class="log-content">
              <h4>功能优化</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>
                  聊天，优化项目序号、代码、表格内容显示，增加分享对话功能，导出功能增加PNG图片文件类型，参数配置增加模型配置
                </li>
                <li>起名，优化prompt</li>
                <li>设置，更新日志修改排版</li>
              </ul>
            </div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2022/03/05" placement="top">
          <el-card shadow="hover">
            <h3>v1.0.0</h3>
            <div class="log-content">
              <h4>新功能</h4>
              <el-divider></el-divider>
              <ul class="detail">
                <li>
                  聊天，聊天内容支持Markdown渲染、代码块渲染，支持复制删减对话，支持导出对话，支持参数连续对话和温度配置。
                </li>
                <li>起名，支持自定义参考书籍</li>
                <li>设置，支持API Key配置</li>
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
