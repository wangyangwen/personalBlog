<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
  ElMessage.success('已安全退出')
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside width="250px" class="admin-aside">
      <div class="logo-container">
        <h1>科技博客</h1>
        <p>管理后台</p>
      </div>
      
      <el-menu
        class="admin-menu"
        :router="true"
        :default-active="$route.path"
      >
        <el-menu-item index="/admin/articles">
          <el-icon><document /></el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/videos">
          <el-icon><video-camera /></el-icon>
          <span>视频管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header class="admin-header">
        <div class="header-left">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-dropdown @command="handleLogout">
            <span class="user-profile">
              <el-avatar :size="32" :src="'https://picsum.photos/32'" />
              <span>{{ authStore.user?.username }}</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <el-icon><switch-button /></el-icon>
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="admin-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.admin-layout {
  min-height: 100vh;
}

.admin-aside {
  background: var(--el-bg-color-overlay);
  border-right: 1px solid var(--el-border-color-light);
  
  .logo-container {
    height: 60px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--el-color-primary-light-9);
    
    h1 {
      font-size: 1.2rem;
      margin: 0;
      color: var(--el-color-primary);
    }
    
    p {
      font-size: 0.8rem;
      margin: 0;
      color: var(--el-text-color-secondary);
    }
  }
}

.admin-menu {
  border-right: none;
}

.admin-header {
  background: var(--el-bg-color-overlay);
  border-bottom: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
  
  span {
    margin: 0 0.5rem;
    color: var(--el-text-color-primary);
  }
}

.admin-main {
  background: var(--el-bg-color);
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>