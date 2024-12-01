import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      baseUrl: 'http://localhost:3001',
    }
  },
  methods: {
    async fetchData<T>(endpoint: string): Promise<T | null> {
      try {
        const response = await fetch(`${this.baseUrl}/${endpoint}`)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data: T = await response.json()
        return data
      } catch (error) {
        console.error(error)
        return null
      }
    },
  },
})
