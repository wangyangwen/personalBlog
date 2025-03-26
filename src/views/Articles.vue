<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../stores'
import { ElMessage } from 'element-plus'

const articleStore = useArticleStore()
const articles = ref([])
const searchQuery = ref('')
const selectedCategory = ref('all')
const loading = ref(false)

const categories = [
  { value: 'all', label: '全部' },
  { value: 'ai', label: '人工智能' },
  { value: 'blockchain', label: '区块链' },
  { value: 'cloud', label: '云计算' },
  { value: 'security', label: '网络安全' }
]

const filteredArticles = computed(() => {
  return articles.value
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'all' || article.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
})

const fetchArticles = async () => {
  loading.value = true
  try {
    // 模拟API调用
    const response = [
      {
        id: 1,
        title: '探索人工智能的未来',
        summary: '人工智能技术正在快速发展，本文探讨了AI在各个领域的应用前景...',
        cover: 'https://picsum.photos/800/400',
        date: '2024-01-15',
        category: 'ai',
        readTime: '5分钟阅读',
        tags: ['AI', '机器学习', '深度学习']
      },
      {
        id: 2,
        title: '区块链技术革新',
        summary: '区块链不仅仅是加密货币的基础，更是未来数字经济的重要基石...',
        cover: 'https://picsum.photos/800/400',
        date: '2024-01-14',
        category: 'blockchain',
        readTime: '8分钟阅读',
        tags: ['区块链', '加密货币', 'Web3']
      }
    ]
    articles.value = response
  } catch (error) {
    ElMessage.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <div class="articles-page">
    <div class="page-header">
      <h1>探索文章</h1>
      <p>发现最新的科技趋势和见解</p>
    </div>
    <div class="filter-section">
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索文章..."
          :prefix-icon="Search"
          clearable
        />
      </div>
      <div class="category-filter">
        <el-radio-group v-model="selectedCategory">
          <el-radio-button
            v-for="category in categories"
            :key="category.value"
            :label="category.value"
          >
            {{ category.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <el-row :gutter="20" class="articles-grid">
      <el-col
        v-for="article in filteredArticles"
        :key="article.id"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <el-card
          class="article-card"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="article-image">
            <img :src="article.cover" :alt="article.title">
            <div class="article-category">
              {{ categories.find(c => c.value === article.category)?.label }}
            </div>
          </div>
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-meta">
              <span class="read-time">{{ article.readTime }}</span>
              <span class="date">{{ article.date }}</span>
            </div>
            <div class="article-tags">
              <el-tag
                v-for="tag in article.tags"
                :key="tag"
                size="small"
                effect="dark"
              >
                {{ tag }}
              </el-tag>
            </div>
            <router-link
              :to="`/article/${article.id}`"
              class="read-more-link"
            >
              阅读更多
              <el-icon class="el-icon--right"><arrow-right /></el-icon>
            </router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-empty
      v-if="filteredArticles.length === 0"
      description="暂无相关文章"
    />
  </div>
</template>

<style scoped lang="scss">
.articles-page {
  padding: 2rem;
  min-height: 100vh;
  background: var(--el-bg-color);
}

.filter-section {
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  .search-box {
    flex: 1;
    min-width: 200px;
  }

  .category-filter {
    flex-shrink: 0;
  }
}

.articles-grid {
  margin-bottom: 2rem;
}

.article-card {
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  border: none;
  background: var(--el-bg-color-overlay);

  &:hover {
    transform: translateY(-5px);
  }
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .article-category {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
  }
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--el-text-color-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  color: var(--el-text-color-regular);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: var(--el-text-color-secondary);
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.article-tags {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--el-color-primary-light-3);
  }

  .el-icon {
    margin-left: 0.3rem;
    transition: transform 0.3s ease;
  }

  &:hover .el-icon {
    transform: translateX(3px);
  }
}
</style>