export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBaseUrl as string,

    onRequest({ options }) {
      const authStore = useAuthStore()
      if (authStore.token) {
        options.headers = new Headers(options.headers)
        options.headers.set('Authorization', `Bearer ${authStore.token}`)
      }
    },

    onResponseError({ response }) {
      if (response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        navigateTo('/login')
      }
    },
  })

  return { provide: { api } }
})
