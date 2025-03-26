<script setup>
import { ref, onMounted } from 'vue'
import { useVideoStore } from '../../stores'
import { ElMessage, ElMessageBox } from 'element-plus'

const videoStore = useVideoStore()
const videos = ref([])
const loading = ref(false)
const uploadDialogVisible = ref(false)
const uploadProgress = ref(0)

const videoForm = ref({
  title: '',
  description: '',
  category: '',
  tags: [],
  file: null
})

const rules = {
  title: [{ required: true, message: '请输入视频标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择视频分类', trigger: 'change' }],
  file: [{ required: true, message: '请上传视频文件', trigger: 'change' }]
}

const categories = [
  { value: 'tutorial', label: '教程' },
  { value: 'tech-review', label: '技术评测' },
  { value: 'conference', label: '会议演讲' },
  { value: 'interview', label: '技术访谈' }
]

const fetchVideos = async () => {
  loading.value = true
  try {
    // 模拟API调用
    const response = [
      {
        id: 1,
        title: 'Vue3 完整开发指南',
        description: '从入门到精通的Vue3开发教程，包含组合式API、响应式系统等核心概念...',
        thumbnail: 'https://picsum.photos/400/225',
        category: 'tutorial',
        tags: ['Vue3', '前端开发', 'JavaScript'],
        duration: '45:30',
        views: 1234,
        date: '2024-01-15',
        status: 'published'
      },
      {
        id: 2,
        title: '人工智能技术分享会',
        description: '探讨最新AI技术发展趋势，深入解析大语言模型的应用场景...',
        thumbnail: 'https://picsum.photos/400/225',
        category: 'conference',
        tags: ['AI', '机器学习', '技术分享'],
        duration: '1:20:15',
        views: 856,
        date: '2024-01-14',
        status: 'processing'
      }
    ]
    videos.value = response
  } catch (error) {
    ElMessage.error('获取视频列表失败')
  } finally {
    loading.value = false
  }
}

const handleFileChange = (file) => {
  const isVideo = file.type.startsWith('video/')
  const isLt2G = file.size / 1024 / 1024 / 1024 < 2

  if (!isVideo) {
    ElMessage.error('只能上传视频文件！')
    return false
  }
  if (!isLt2G) {
    ElMessage.error('视频大小不能超过 2GB！')
    return false
  }

  videoForm.value.file = file
  return true
}

const simulateUpload = async () => {
  const totalSteps = 100
  const stepTime = 50
  
  for (let i = 0; i <= totalSteps; i++) {
    await new Promise(resolve => setTimeout(resolve, stepTime))
    uploadProgress.value = i
  }
}

const handleUpload = async (formEl) => {
  if (!formEl) return
  
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // 模拟上传过程
        await simulateUpload()
        
        const newVideo = {
          id: Date.now(),
          title: videoForm.value.title,
          description: videoForm.value.description,
          category: videoForm.value.category,
          tags: videoForm.value.tags,
          thumbnail: 'https://picsum.photos/400/225',
          duration: '00:00',
          views: 0,
          date: new Date().toLocaleDateString(),
          status: 'processing'
        }
        
        videos.value.unshift(newVideo)
        uploadDialogVisible.value = false
        ElMessage.success('视频上传成功')
      } catch (error) {
        ElMessage.error('上传失败')
      } finally {
        uploadProgress.value = 0
      }
    }
  })
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除这个视频吗？', '警告', {
      type: 'warning'
    })
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))
    videos.value = videos.value.filter(item => item.id !== row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  videoForm.value = {
    title: '',
    description: '',
    category: '',
    tags: [],
    file: null
  }
  uploadProgress.value = 0
}

const openUploadDialog = () => {
  uploadDialogVisible.value = true
}

onMounted(() => {
  fetchVideos()
})
</script>

<template>
  <div class="video-manage">
    <div class="page-header">
      <h2>视频管理</h2>
      <el-button type="primary" @click="openUploadDialog">
        <el-icon><upload /></el-icon>
        上传视频
      </el-button>
    </div>

    <el-table
      v-loading="loading"
      :data="videos"
      style="width: 100%"
      border
    >
      <el-table-column prop="title" label="标题" min-width="300">
        <template #default="{ row }">
          <div class="video-title-cell">
            <el-image
              :src="row.thumbnail"
              :preview-src-list="[row.thumbnail]"
              fit="cover"
              class="video-thumbnail"
            />
            <div class="video-info">
              <h3>{{ row.title }}</h3>
              <p>{{ row.description }}</p>
            </div>
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
      
      <el-table-column prop="duration" label="时长" width="100" />
      
      <el-table-column prop="views" label="播放量" width="100" />
      
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag
            :type="row.status === 'published' ? 'success' : 'warning'"
            size="small"
          >
            {{ row.status === 'published' ? '已发布' : '处理中' }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column prop="date" label="上传日期" width="120" />
      
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            link
            :disabled="row.status !== 'published'"
          >
            预览
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
      v-model="uploadDialogVisible"
      title="上传视频"
      width="600px"
      destroy-on-close
    >
      <el-form
        ref="videoFormRef"
        :model="videoForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="视频标题" prop="title">
          <el-input v-model="videoForm.title" placeholder="请输入视频标题" />
        </el-form-item>

        <el-form-item label="视频分类" prop="category">
          <el-select v-model="videoForm.category" placeholder="请选择视频分类">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="视频标签">
          <el-select
            v-model="videoForm.tags"
            multiple
            filterable
            allow-create
            placeholder="请选择或创建标签"
          >
            <el-option
              v-for="tag in ['Vue3', '前端开发', 'JavaScript', 'AI', '机器学习']"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="视频描述">
          <el-input
            v-model="videoForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入视频描述"
          />
        </el-form-item>

        <el-form-item label="视频文件" prop="file">
          <el-upload
            class="video-upload"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
          >
            <template #trigger>
              <el-button type="primary">
                选择视频
              </el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">
                支持mp4、webm格式，文件大小不超过2GB
              </div>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item v-if="uploadProgress > 0">
          <el-progress :percentage="uploadProgress" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpload(videoFormRef)">
          开始上传
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.video-manage {
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

.video-title-cell {
  display: flex;
  gap: 1rem;

  .video-thumbnail {
    width: 160px;
    height: 90px;
    border-radius: 4px;
    overflow: hidden;
  }

  .video-info {
    flex: 1;
    min-width: 0;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
      color: var(--el-text-color-primary);
    }

    p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--el-text-color-secondary);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

.tag {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.video-upload {
  :deep(.el-upload-list) {
    margin-top: 1rem;
  }
}
</style>