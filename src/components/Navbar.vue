<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Menu as IconMenu, Close, User, Search } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/articles',
      query: { search: searchQuery.value }
    })
    searchQuery.value = ''
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
]

const isActive = computed(() => (path) => {
  return route.path === path
})

// 监听滚动事件，当页面滚动时改变导航栏样式
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 在组件挂载时添加滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

// 在组件卸载时移除滚动事件监听器
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="navbar-container">
      <div class="navbar-logo" @click="router.push('/')">
        <span class="logo-text">Tech<span class="highlight">Blog</span></span>
      </div>
      
      <div class="navbar-links-desktop">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          :class="['nav-link', { 'active': isActive(link.path) }]"
          @click="closeMenu"
        >
          {{ link.name }}
        </router-link>
        
        <div class="search-container">
          <el-input
            v-model="searchQuery"
            placeholder="搜索文章..."
            class="search-input"
            @keyup.enter="handleSearch"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        
        <div class="admin-link">
          <router-link to="/admin/login" class="login-button">
            <el-icon><User /></el-icon>
            <span>管理入口</span>
          </router-link>
        </div>
      </div>
      
      <div class="navbar-toggle" @click="toggleMenu">
        <el-icon v-if="!isMenuOpen"><IconMenu /></el-icon>
        <el-icon v-else><Close /></el-icon>
      </div>
    </div>
    
    <div :class="['navbar-links-mobile', { 'open': isMenuOpen }]">
      <router-link 
        v-for="link in navLinks" 
        :key="link.path" 
        :to="link.path"
        :class="['nav-link', { 'active': isActive(link.path) }]"
        @click="closeMenu"
      >
        {{ link.name }}
      </router-link>
      
      <div class="mobile-search">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章..."
          class="search-input-mobile"
          @keyup.enter="handleSearch"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
      
      <router-link to="/admin/login" class="nav-link" @click="closeMenu">
        管理入口
      </router-link>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &.scrolled {
    background: rgba(18, 18, 18, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.navbar-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 1px;
  
  .highlight {
    background: linear-gradient(90deg, var(--el-color-primary), #36d1dc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.navbar-links-desktop {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover, &.active {
    color: #ffffff;
    
    &::after {
      width: 100%;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--el-color-primary), #36d1dc);
    transition: width 0.3s ease;
  }
}

.search-container {
  margin: 0 1rem;
  width: 200px;
  transition: width 0.3s ease;
  
  @media (max-width: 992px) {
    width: 150px;
  }
}

.mobile-search {
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
}

.search-input, .search-input-mobile {
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    box-shadow: none;
    border-radius: 20px;
    
    &:hover, &:focus {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  :deep(.el-input__inner) {
    color: white;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  
  :deep(.el-input__prefix) {
    color: rgba(255, 255, 255, 0.7);
  }
}

.search-input-mobile {
  width: 100%;
  
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.15);
  }
}

.admin-link {
  margin-left: 1rem;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, var(--el-color-primary), #36d1dc);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 120, 255, 0.3);
  }
}

.navbar-toggle {
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    display: block;
  }
}

.navbar-links-mobile {
  display: none;
  flex-direction: column;
  background: rgba(18, 18, 18, 0.95);
  padding: 1rem;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 999;
  
  &.open {
    transform: translateY(0);
    display: flex;
  }
  
  .nav-link {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
}
</style>