<template>
  <div
    :class="[
      'animate-pulse rounded-[8px] bg-retro/[0.08] border border-retro/10',
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
