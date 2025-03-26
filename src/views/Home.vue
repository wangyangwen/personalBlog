<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../stores'
import { ArrowUp } from '@element-plus/icons-vue'

const articleStore = useArticleStore()
const articles = ref([])
const showBackToTop = ref(false)
const currentSlide = ref(0)
const slides = ref([
  {
    id: 1,
    image: 'https://picsum.photos/1920/1080?random=1',
    title: '探索科技的无限可能',
    description: '分享最新科技动态，探讨未来发展趋势'
  },
  {
    id: 2,
    image: 'https://picsum.photos/1920/1080?random=2',
    title: '人工智能的新纪元',
    description: '深入了解AI如何改变我们的生活与工作方式'
  },
  {
    id: 3,
    image: 'https://picsum.photos/1920/1080?random=3',
    title: '区块链与Web3.0',
    description: '探索去中心化技术如何重塑互联网未来'
  }
])

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const startTextAnimation = () => {
  // 每5秒切换一次轮播图
  setInterval(nextSlide, 5000)
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  startTextAnimation()
  // 模拟获取文章列表数据
  articles.value = [
    {
      id: 1,
      title: '探索人工智能的未来',
      summary: '人工智能技术正在快速发展，本文探讨了AI在各个领域的应用前景...',
      cover: 'https://picsum.photos/800/400',
      date: '2024-01-15'
    },
    {
      id: 2,
      title: '量子计算：下一代计算革命',
      summary: '量子计算机将如何改变我们的世界？本文深入浅出地介绍量子计算的基本原理...',
      cover: 'https://picsum.photos/800/400',
      date: '2024-01-14'
    }
  ]
})
</script>

<template>
  <div class="home">
    <header class="hero" id="hero">
      <div class="hero-slider">
        <div v-for="(slide, index) in slides" :key="slide.id" 
             class="hero-slide" 
             :class="{ active: index === currentSlide }">
          <img :src="slide.image" :alt="slide.title" class="slide-bg">
          <div class="hero-content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.description }}</p>
            <el-button type="primary" size="large" class="cta-button" @click="scrollToTop">
              开始探索
            </el-button>
          </div>
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="slide-indicators">
        <span v-for="(slide, index) in slides" :key="slide.id"
              class="indicator" 
              :class="{ active: index === currentSlide }"
              @click="currentSlide = index"></span>
      </div>
    </header>

    <main class="main-content">
      <section class="articles">
        <h2>最新文章</h2>
        <div class="article-grid">
          <article v-for="article in articles" :key="article.id" class="article-card">
            <div class="article-image">
              <img :src="article.cover" :alt="article.title">
              <div class="article-overlay">
                <router-link :to="`/article/${article.id}`" class="read-more-overlay">
                  阅读更多
                </router-link>
              </div>
            </div>
            <div class="article-content">
              <h3>{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
              <div class="article-meta">
                <span class="date">{{ article.date }}</span>
                <router-link :to="`/article/${article.id}`" class="read-more">
                  阅读更多
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <el-backtop :right="40" :bottom="40" :visibility-height="300">
      <el-button type="primary" circle>
        <el-icon><ArrowUp /></el-icon>
      </el-button>
    </el-backtop>
  </div>
</template>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: var(--el-bg-color);
}

.hero {
  height: 50vh; /* 减小高度 */
  background: linear-gradient(135deg, #121212 0%, #2a2a2a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" x="0" y="0" width="100" height="100"/></svg>') repeat;
    opacity: 0.5;
    animation: backgroundMove 20s linear infinite;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-slide.active {
  opacity: 1;
}

.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-indicators {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.hero-content {
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #00ff00, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleGlow 2s ease-in-out infinite alternate;
  }

  p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    opacity: 0.9;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .cta-button {
    font-size: 1.2rem;
    padding: 1rem 2.5rem;
    border-radius: 50px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }
  }
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.articles {
  h2 {
    font-size: clamp(2rem, 3vw, 2.5rem);
    margin-bottom: 3rem;
    color: var(--el-text-color-primary);
    text-align: center;
  }
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
}

.article-card {
  background: var(--el-bg-color-overlay);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);

    .article-image img {
      transform: scale(1.1);
    }

    .article-overlay {
      opacity: 1;
    }
  }
}

.article-image {
  position: relative;
  height: 240px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.article-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  .read-more-overlay {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 1rem 2rem;
    border: 2px solid white;
    border-radius: 30px;
    transition: all 0.3s ease;

    &:hover {
      background: white;
      color: black;
    }
  }
}

.article-content {
  padding: 2rem;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--el-text-color-primary);
    line-height: 1.4;
  }

  p {
    color: var(--el-text-color-regular);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--el-text-color-secondary);

  .date {
    font-size: 0.9rem;
  }

  .read-more {
    color: var(--el-color-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}

@keyframes backgroundMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
}

@keyframes titleGlow {
  from {
    filter: drop-shadow(0 0 2px rgba(0, 255, 255, 0.7));
  }
  to {
    filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.9));
  }
}

@media (max-width: 768px) {
  .hero-content {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
    }
  }

  .main-content {
    padding: 2rem 1rem;
  }

  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>