// stores/news.js
import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    news: [], // Initial state for your news array
  }),
  actions: {
    setNews(newsArray) {
      this.news = newsArray
    },
    addNews(news) {
      this.news.push(news)
    },
    clearNews() {
      this.news = []
    },
  },
  getters: {
    getNews: (state) => state.news,
    newsCount: (state) => state.news.length,
    searchNews: (state) => {
      return (query) =>
        state.news.filter((news) => {
          return (
            news?.title?.rendered.toLowerCase().includes(query?.query?.toLowerCase()) ||
            news?.acf?.phone.toLowerCase().includes(query?.query?.toLowerCase()) ||
            news?.acf?.department.includes(query?.department) ||
            news?.acf?.office.includes(query?.office) ||
            news?.acf?.service.includes(query?.service)
          )
        })
    },
    getNewsById: (state) => (id) => state.news.find((news) => news.id === id),
    getNewsBySlug: (state) => (slug) => state.news.find((news) => news.slug === slug),
  },
})
