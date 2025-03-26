<script setup>
import { ref, onMounted } from 'vue'
import { useArticleStore } from '../../stores'
import { ElMessage, ElMessageBox } from 'element-plus'

const articleStore = useArticleStore()
const articles = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('新建文章')

const articleForm = ref({
  id: '',
  title: '',
  content: '',
  summary: '',
  category: '',
  tags: [],
  cover: ''
})

const rules = {
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
  category: [{ required: true, message: '请选择文章分类', trigger: 'change' }]
}

const categories = [
  { value: 'ai', label: '人工智能' },
  { value: 'blockchain', label: '区块链' },
  { value: 'cloud', label: '云计算' },
  { value: 'security', label: '网络安全' }
]

const fetchArticles = async () => {
  loading.value = true
  try {
    // 模拟API调用
    const response = [
      {
        id: 1,
        title: '探索人工智能的未来',
        summary: '人工智能技术正在快速发展，本文探讨了AI在各个领域的应用前景...',
        content: '# 探索人工智能的未来\n\n人工智能（AI）正在以前所未有的速度改变着我们的世界...',
        category: 'ai',
        tags: ['AI', '机器学习', '深度学习'],
        cover: 'https://picsum.photos/800/400',
        status: 'published',
        date: '2024-01-15',
        views: 1234
      }
    ]
    articles.value = response
  } catch (error) {
    ElMessage.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

const handleEdit = (row) => {
  dialogTitle.value = '编辑文章'
  articleForm.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这篇文章吗？', '警告', {
      type: 'warning'
    })
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    articles.value = articles.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleSubmit = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (articleForm.value.id) {
          // 更新文章
          const index = articles.value.findIndex(item => item.id === articleForm.value.id)
          articles.value[index] = { ...articles.value[index], ...articleForm.value }
          ElMessage.success('更新成功')
        } else {
          // 新建文章
          const newArticle = {
            ...articleForm.value,
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            status: 'draft',
            views: 0
          }
          articles.value.unshift(newArticle)
          ElMessage.success('创建成功')
        }
        
        dialogVisible.value = false
      } catch (error) {
        ElMessage.error('操作失败')
      }
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  articleForm.value = {
    id: '',
    title: '',
    content: '',
    summary: '',
    category: '',
    tags: [],
    cover: ''
  }
}

const handleCreate = () => {
  dialogTitle.value = '新建文章'
  dialogVisible.value = true
}

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <div class="article-manage">
    <div class="page-header">
      <h2>文章管理</h2>
      <el-button type="primary" @click="handleCreate">
        <el-icon><plus /></el-icon>
        新建文章
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="articles"
      style="width: 100%"
      border
    >
      <el-table-column prop="title" label="标题" min-width="200">
        <template #default="{ row }">
          <div class="article-title-cell">
            <el-image
              :src="row.cover"
              :preview-src-list="[row.cover]"
              fit="cover"
              class="article-cover"
            />
            <span>{{ row.title }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="category" label="分类" width="120">
        <template #default="{ row }">
          {{ categories.find(c => c.value === row.category)?.label }}
        </template>
      </el-table-column>
      
      <el-table-column prop="tags" label="标签" width="200">
        <template #default="{ row }">
          <el-tag
            v-for="tag in row.tags"
            :key="tag"
            size="small"
            class="tag"
          >
            {{ tag }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag
            :type="row.status === 'published' ? 'success' : 'warning'"
            size="small"
          >
            {{ row.status === 'published' ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="views" label="阅读量" width="100" />
      
      <el-table-column prop="date" label="发布日期" width="120" />
      
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            @click="handleEdit(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            link
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="70%"
      destroy-on-close
    >
      <el-form
        ref="articleFormRef"
        :model="articleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="文章分类" prop="category">
          <el-select v-model="articleForm.category" placeholder="请选择文章分类">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="文章标签">
          <el-select
            v-model="articleForm.tags"
            multiple
            filterable
            allow-create
            placeholder="请选择或创建标签"
          >
            <el-option
              v-for="tag in ['AI', '机器学习', '深度学习', '区块链', '云计算', '网络安全']"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片">
          <el-input v-model="articleForm.cover" placeholder="请输入封面图片URL" />
          <div class="cover-preview" v-if="articleForm.cover">
            <el-image
              :src="articleForm.cover"
              fit="cover"
              :preview-src-list="[articleForm.cover]"
            />
          </div>
        </el-form-item>

        <el-form-item label="文章摘要">
          <el-input
            v-model="articleForm.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
          />
        </el-form-item>

        <el-form-item label="文章内容" prop="content">
          <el-input
            v-model="articleForm.content"
            type="textarea"
            :rows="10"
            placeholder="请使用Markdown格式编写文章内容"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit(articleFormRef)">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.article-manage {
  padding: 1rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--el-text-color-primary);
  }
}

.article-title-cell {
  display: flex;
  align-items: center;
  gap: 1rem;

  .article-cover {
    width: 60px;
    height: 40px;
    border-radius: 4px;
    overflow: hidden;
  }
}

.tag {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.cover-preview {
  margin-top: 1rem;
  width: 200px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>