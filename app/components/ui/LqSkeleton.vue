<template>
  <div
    :class="[
      'animate-pulse bg-white/5 rounded',
      heightClass,
      widthClass,
    ]"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  height?: string
  width?: string
}>(), {
  height: 'h-4',
  width: 'w-full',
})

const heightClass = computed(() => props.height)
const widthClass = computed(() => props.width)
</script>
