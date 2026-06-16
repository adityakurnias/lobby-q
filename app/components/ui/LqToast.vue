<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      <TransitionGroup
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-soft-lg',
            variantClasses(toast.type),
          ]"
        >
          <!-- Icon -->
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else class="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span class="text-sm text-white flex-1">{{ toast.message }}</span>
          <button
            class="text-gray-400 hover:text-white transition-colors shrink-0"
            @click="removeToast(toast.id)"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Toast {
  id: number
  type: 'success' | 'error' | 'warning'
  message: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

const variantClasses = (type: Toast['type']) => {
  const variants = {
    success: 'bg-green-900/80 border-green-700/50 backdrop-blur-sm',
    error: 'bg-red-900/80 border-red-700/50 backdrop-blur-sm',
    warning: 'bg-amber-900/80 border-amber-700/50 backdrop-blur-sm',
  }
  return variants[type]
}

const addToast = (type: Toast['type'], message: string, duration = 4000) => {
  const id = nextId++
  toasts.value.push({ id, type, message })
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration)
  }
}

const removeToast = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id)
}

// Expose for use in pages
defineExpose({ addToast })

// Also provide via composable pattern
provide('toast', { addToast })
</script>
