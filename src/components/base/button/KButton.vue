<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'large'
  },
  icon: {
    type: Boolean,
    default: false
  }
})

const button = cva('rounded-3xl border-transparent inline-flex min-w-fit items-center justify-center text-center font-medium align-bottom', {
  variants: {
    variant: {
      primary: 'text-white dark:text-surface-900 bg-primary dark:bg-primary-dark hover:bg-primary-hover dark:hover:bg-primary-dark-hover active:bg-primary dark:active:bg-primary-dark-pressed',
      secondary: 'text-secondary-text dark:text-secondary-dark-text bg-secondary dark:bg-secondary-dark hover:bg-secondary-hover dark:hover:bg-secondary-dark-hover active:bg-secondary-pressed dark:active:bg-secondary-dark-pressed',
    },
    size: {
      small: 'h-8 text-sm px-4 py-2',
      large: 'h-12 text-lg px-4 py-3',
    }
  },
})

const buttonClass = computed(() =>
  button({ variant: props.variant, size: props.size}),
)
</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

