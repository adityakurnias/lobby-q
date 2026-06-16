<template>
  <div :class="['relative select-none inline-block lq-logo-container flex-shrink-0', sizeClasses]">
    <img
      src="/logo.png"
      alt="LobbyQ Logo"
      class="w-full h-full object-contain lq-logo-img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  size: 'md',
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }
  return sizes[props.size]
})
</script>

<style scoped>
.lq-logo-img {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lq-logo-container:hover .lq-logo-img {
  transform: translateY(-1px) scale(1.02);
}
</style>
