<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 font-mono">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="[
            'flex items-center gap-3 px-4 py-3.5 rounded-[10px] border-[1.5px] border-retro shadow-soft transition-all',
            variantClasses(toast.type),
          ]"
        >
          <div class="shrink-0">
            <svg v-if="toast.type === 'success'" class="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="toast.type === 'error'" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <span class="text-xs font-mono font-bold text-retro flex-1 leading-relaxed">{{ toast.message }}</span>
          <button
            class="text-[var(--color-text-tertiary)] hover:text-retro transition-colors shrink-0 p-1 rounded-md hover:bg-surface-dark cursor-pointer"
            @click="removeToast(toast.id)"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

interface Toast {
  id: number
  type: 'success' | 'error' | 'warning'
  message: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

const variantClasses = (type: Toast['type']) => {
  const variants = {
    success: 'bg-white border-l-[4px] border-l-secondary',
    error: 'bg-white border-l-[4px] border-l-primary',
    warning: 'bg-white border-l-[4px] border-l-amber-600',
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

defineExpose({ addToast })

provide('toast', { addToast })
</script>
