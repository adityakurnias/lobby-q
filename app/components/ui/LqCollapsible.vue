<template>
  <div class="border-[1.5px] border-retro rounded-[10px] overflow-hidden bg-surface shadow-soft">
    <button
      class="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-dark active:bg-surface-deepest transition-colors"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-2.5">
        <slot name="title">{{ title }}</slot>
        <span
          v-if="count !== undefined"
          class="bg-transparent text-secondary text-[10px] font-mono font-bold px-2 py-0.5 rounded-[4px] min-w-[1.5rem] text-center border border-retro"
        >
          {{ count }}
        </span>
      </div>
      <svg
        :class="['w-4 h-4 text-retro transition-transform duration-300 ease-out', isOpen && 'rotate-180']"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[2000px] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[2000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <div class="px-4 pb-4">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
