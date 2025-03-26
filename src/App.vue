<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  --el-bg-color: #121212;
  --el-bg-color-overlay: #1e1e1e;
  --el-text-color-primary: #ffffff;
  --el-text-color-regular: rgba(255, 255, 255, 0.8);
  --el-text-color-secondary: rgba(255, 255, 255, 0.6);
  --el-color-primary: #409eff;
  --el-border-color-light: rgba(255, 255, 255, 0.1);
  --el-border-color: rgba(255, 255, 255, 0.2);
  --el-color-primary-light-3: #79bbff;
  --el-color-success: #67c23a;
  --el-color-warning: #e6a23c;
  --el-color-danger: #f56c6c;
  --el-color-info: #909399;
  --app-transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--el-text-color-primary);
  background: var(--el-bg-color);
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 60px; /* 为固定导航栏留出空间 */
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: var(--el-color-primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--el-color-primary-light-3);
}
</style>
