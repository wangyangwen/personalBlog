<script setup>
import { computed } from 'vue'
import { Message, Position, ChatDotRound, Link } from '@element-plus/icons-vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-section about">
        <h3>关于我们</h3>
        <p>TechBlog致力于分享最新科技动态，探讨未来发展趋势，为读者提供有价值的科技资讯。</p>
      </div>
      
      <div class="footer-section links">
        <h3>快速链接</h3>
        <ul>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/articles">文章</router-link></li>
          <li><router-link to="/admin/login">管理入口</router-link></li>
        </ul>
      </div>
      
      <div class="footer-section contact">
        <h3>联系我们</h3>
        <p><el-icon><Message /></el-icon> contact@techblog.com</p>
        <div class="social-icons">
          <a href="#" aria-label="GitHub"><el-icon><Position /></el-icon></a>
          <a href="#" aria-label="Twitter"><el-icon><ChatDotRound /></el-icon></a>
          <a href="#" aria-label="LinkedIn"><el-icon><Link /></el-icon></a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; {{ currentYear }} TechBlog. 保留所有权利。</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  background: var(--el-bg-color-overlay);
  color: var(--el-text-color-regular);
  padding: 3rem 0 1rem;
  margin-top: 3rem;
  border-top: 1px solid var(--el-border-color-light);
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-section {
  h3 {
    color: var(--el-text-color-primary);
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
    position: relative;
    padding-bottom: 0.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 2px;
      background: linear-gradient(90deg, var(--el-color-primary), #36d1dc);
    }
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.8rem;
      
      a {
        color: var(--el-text-color-regular);
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
  }
  
  .social-icons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: var(--el-text-color-primary);
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--el-color-primary);
        color: white;
        transform: translateY(-3px);
      }
    }
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid var(--el-border-color-light);
  font-size: 0.9rem;
  color: var(--el-text-color-secondary);
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
  }
}
</style>