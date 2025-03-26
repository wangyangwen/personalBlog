<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../stores'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const articleStore = useArticleStore()
const article = ref(null)
const loading = ref(true)
const comments = ref([])
const newComment = ref('')

const fetchArticle = async () => {
  loading.value = true
  try {
    // 模拟API调用
    article.value = {
      id: parseInt(route.params.id),
      title: '探索人工智能的未来',
      content: `# 探索人工智能的未来

人工智能（AI）正在以前所未有的速度改变着我们的世界。从自动驾驶汽车到智能医疗诊断，从个人助理到工业机器人，AI的应用已经渗透到了我们生活的方方面面。

## 1. AI的发展现状

近年来，深度学习技术的突破使得AI在图像识别、自然语言处理等领域取得了巨大进展。GPT等大型语言模型的出现，更是展示了AI在理解和生成人类语言方面的惊人能力。

## 2. AI的应用领域

### 2.1 医疗健康
- 疾病诊断
- 药物研发
- 个性化治疗

### 2.2 金融科技
- 风险评估
- 智能投顾
- 反欺诈系统

## 3. 未来展望

AI技术将继续快速发展，但同时我们也需要关注:
- 伦理问题
- 隐私保护
- 就业影响

让我们共同期待AI带来的美好未来！`,
      author: '科技先锋',
      date: '2024-01-15',
      category: 'ai',
      tags: ['AI', '机器学习', '深度学习'],
      readCount: 1234,
      likeCount: 88
    }
    
    comments.value = [
      {
        id: 1,
        author: '创新者',
        avatar: 'https://picsum.photos/50',
        content: '非常棒的文章！对AI的未来发展做出了很好的展望。',
        date: '2024-01-15 14:30',
        likes: 12
      },
      {
        id: 2,
        author: '技术爱好者',
        avatar: 'https://picsum.photos/50',
        content: '文章分析很到位，期待更多AI相关的内容。',
        date: '2024-01-15 15:45',
        likes: 8
      }
    ]
  } catch (error) {
    ElMessage.error('获取文章详情失败')
  } finally {
    loading.value = false
  }
}

const submitComment = () => {
  if (!newComment.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }
  
  comments.value.unshift({
    id: Date.now(),
    author: '访客用户',
    avatar: 'https://picsum.photos/50',
    content: newComment.value,
    date: new Date().toLocaleString(),
    likes: 0
  })
  
  newComment.value = ''
  ElMessage.success('评论发布成功')
}

const likeArticle = () => {
  article.value.likeCount++
  ElMessage.success('点赞成功')
}

const shareArticle = () => {
  // 实现分享功能
  ElMessage.success('分享链接已复制到剪贴板')
}

onMounted(() => {
  fetchArticle()
})
</script>

<template>
  <div class="article-detail">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="skeleton-content">
          <el-skeleton-item variant="h1" style="width: 80%" />
          <el-skeleton-item variant="text" style="width: 40%" />
          <el-skeleton-item variant="text" style="width: 100%" />
          <el-skeleton-item variant="text" style="width: 100%" />
          <el-skeleton-item variant="text" style="width: 90%" />
        </div>
      </template>
      
      <template #default>
        <article class="article-content" v-if="article">
          <header class="article-header">
            <h1>{{ article.title }}</h1>
            <div class="article-meta">
              <span class="author">
                <el-icon><user /></el-icon>
                {{ article.author }}
              </span>
              <span class="date">
                <el-icon><calendar /></el-icon>
                {{ article.date }}
              </span>
              <span class="category">
                <el-icon><collection-tag /></el-icon>
                {{ article.category }}
              </span>
              <span class="views">
                <el-icon><view /></el-icon>
                {{ article.readCount }} 阅读
              </span>
            </div>
            <div class="article-tags">
              <el-tag
                v-for="tag in article.tags"
                :key="tag"
                size="small"
                effect="dark"
                class="tag"
              >
                {{ tag }}
              </el-tag>
            </div>
          </header>

          <div class="markdown-content" v-html="article.content"></div>

          <footer class="article-footer">
            <div class="interaction-buttons">
              <el-button type="primary" @click="likeArticle">
                <el-icon><thumb /></el-icon>
                点赞 {{ article.likeCount }}
              </el-button>
              <el-button type="success" @click="shareArticle">
                <el-icon><share /></el-icon>
                分享
              </el-button>
            </div>
          </footer>
        </article>

        <section class="comments-section">
          <h2>评论区</h2>
          <div class="comment-form">
            <el-input
              v-model="newComment"
              type="textarea"
              :rows="3"
              placeholder="写下你的评论..."
            />
            <el-button type="primary" @click="submitComment">
              发表评论
            </el-button>
          </div>

          <div class="comments-list">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="comment-item"
            >
              <el-avatar :src="comment.avatar" />
              <div class="comment-content">
                <div class="comment-header">
                  <span class="comment-author">{{ comment.author }}</span>
                  <span class="comment-date">{{ comment.date }}</span>
                </div>
                <p>{{ comment.content }}</p>
                <div class="comment-actions">
                  <el-button text type="primary">
                    <el-icon><thumb /></el-icon>
                    {{ comment.likes }}
                  </el-button>
                  <el-button text type="primary">
                    <el-icon><chat-round /></el-icon>
                    回复
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped lang="scss">
.article-detail {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.skeleton-content {
  padding: 2rem;
}

.article-content {
  background: var(--el-bg-color-overlay);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-header {
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(120deg, var(--el-color-primary), var(--el-color-success));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  color: var(--el-text-color-secondary);
  margin-bottom: 1rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
}

.article-tags {
  margin-bottom: 1.5rem;
  .tag {
    margin-right: 0.5rem;
  }
}

.markdown-content {
  line-height: 1.8;
  color: var(--el-text-color-primary);

  h1, h2, h3 {
    margin: 1.5rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
}

.article-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--el-border-color-lighter);

  .interaction-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}

.comments-section {
  margin-top: 3rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--el-text-color-primary);
  }
}

.comment-form {
  margin-bottom: 2rem;

  .el-button {
    margin-top: 1rem;
  }
}

.comments-list {
  .comment-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--el-border-color-lighter);

    &:last-child {
      border-bottom: none;
    }
  }
}

.comment-content {
  flex: 1;

  .comment-header {
    margin-bottom: 0.5rem;

    .comment-author {
      font-weight: bold;
      color: var(--el-text-color-primary);
      margin-right: 1rem;
    }

    .comment-date {
      color: var(--el-text-color-secondary);
      font-size: 0.9rem;
    }
  }

  p {
    color: var(--el-text-color-primary);
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
}

.comment-actions {
  display: flex;
  gap: 1rem;
}
</style>