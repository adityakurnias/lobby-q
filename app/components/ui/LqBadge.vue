<template>
  <span
    :class="[
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
      variantClasses,
    ]"
  >
    <span v-if="variant === 'fast-track'">&#11088;</span>
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'normal' | 'fast-track' | 'live' | 'status'
}>(), {
  variant: 'normal',
})

const variantClasses = computed(() => {
  const variants = {
    normal: 'bg-white/10 text-gray-300',
    'fast-track': 'bg-amber-500/20 text-amber-300',
    live: 'bg-red-500/20 text-red-400',
    status: 'bg-primary/20 text-primary',
  }
  return variants[props.variant]
})
</script>
