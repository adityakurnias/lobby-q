<template>
  <button
    :class="[
      'inline-flex items-center justify-center gap-2 border-[1.5px] rounded-[10px] transition-all duration-200 transform',
      'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
      'focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-surface',
      'hover:-translate-y-0.5 active:translate-y-0.5',
      variantClasses,
      sizeClasses,
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin h-3.5 w-3.5"
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
import { computed } from 'vue'

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
    primary: 'bg-primary border-retro text-white shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] active:shadow-[1px_1px_0px_#111111] font-display font-bold',
    secondary: 'bg-surface border-retro text-retro hover:bg-surface-dark shadow-[3px_3px_0px_#111111] hover:shadow-[4px_4px_0px_#111111] active:shadow-[1px_1px_0px_#111111] font-mono font-bold',
    ghost: 'bg-transparent border-transparent text-retro hover:border-retro font-mono font-medium',
    danger: 'bg-transparent border-primary text-primary hover:bg-primary/5 shadow-[3px_3px_0px_#ef233c] hover:shadow-[4px_4px_0px_#ef233c] active:shadow-[1px_1px_0px_#ef233c] font-mono font-bold',
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-[10px] tracking-wide uppercase',
    md: 'px-4 py-2.5 text-xs tracking-wide uppercase',
    lg: 'px-5 py-3 text-sm tracking-wider uppercase',
  }
  return sizes[props.size]
})
</script>
