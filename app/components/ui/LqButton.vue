<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-deeper',
      variantClasses,
      sizeClasses,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary hover:bg-primary-light text-white focus:ring-primary/50',
    secondary: 'bg-secondary hover:bg-secondary-light text-white focus:ring-secondary/50',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 hover:border-white/20 focus:ring-white/20',
    danger: 'bg-red-600 hover:bg-red-500 text-white focus:ring-red-500/50',
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }
  return sizes[props.size]
})
</script>
