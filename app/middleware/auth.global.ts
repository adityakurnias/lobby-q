export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Restore token from cookie on first load
  authStore.restoreFromCookie()

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard']
  const isProtected = protectedRoutes.some((route) => to.path.startsWith(route))

  if (isProtected && !authStore.isLoggedIn) {
    return navigateTo('/login')
  }

  // Redirect logged-in users away from auth pages
  const authPages = ['/login', '/register']
  const isAuthPage = authPages.includes(to.path)

  if (isAuthPage && authStore.isLoggedIn) {
    return navigateTo('/dashboard')
  }
})
