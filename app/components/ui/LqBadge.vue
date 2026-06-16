<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] text-[9px] font-mono font-bold uppercase tracking-wider border-[1.5px] border-retro',
      variantClasses,
    ]"
  >
    <span v-if="variant === 'fast-track'" class="text-[8px]">&#11088;</span>
    <span v-if="variant === 'live'" class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'normal' | 'fast-track' | 'live' | 'status' | 'playing' | 'waiting' | 'parked'
}>(), {
  variant: 'normal',
})

const variantClasses = computed(() => {
  const variants = {
    normal: 'bg-transparent text-retro',
    'fast-track': 'bg-primary/5 text-primary',
    live: 'bg-primary/5 text-primary',
    status: 'bg-secondary/5 text-secondary',
    playing: 'bg-secondary/5 text-secondary',
    waiting: 'bg-transparent text-retro',
    parked: 'bg-transparent text-[var(--color-text-tertiary)] opacity-60',
  }
  return variants[props.variant]
})
</script>
