import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || '',
    user: null
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('admin_token', token)
    },
    setUser(user) {
      this.user = user
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('admin_token')
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
})

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: [],
    currentArticle: null,
    loading: false,
    error: null
  }),
  actions: {
    setArticles(articles) {
      this.articles = articles
    },
    setCurrentArticle(article) {
      this.currentArticle = article
    },
    setLoading(status) {
      this.loading = status
    },
    setError(error) {
      this.error = error
    }
  }
})

export const useVideoStore = defineStore('video', {
  state: () => ({
    videos: [],
    uploadProgress: 0,
    loading: false,
    error: null
  }),
  actions: {
    setVideos(videos) {
      this.videos = videos
    },
    setUploadProgress(progress) {
      this.uploadProgress = progress
    },
    setLoading(status) {
      this.loading = status
    },
    setError(error) {
      this.error = error
    }
  }
})