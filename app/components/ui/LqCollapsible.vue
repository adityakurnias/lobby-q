<template>
  <div class="border border-white/5 rounded-lg overflow-hidden">
    <button
      class="w-full flex items-center justify-between px-4 py-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2">
        <slot name="title">{{ title }}</slot>
        <span
          v-if="count !== undefined"
          class="bg-white/10 text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-full"
        >
          {{ count }}
        </span>
      </div>
      <svg
        :class="['w-4 h-4 text-gray-400 transition-transform duration-200', isOpen && 'rotate-180']"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[2000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[2000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <div class="p-4">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  count?: number
  defaultOpen?: boolean
}>(), {
  title: '',
  defaultOpen: true,
})

const isOpen = ref(props.defaultOpen)
</script>
