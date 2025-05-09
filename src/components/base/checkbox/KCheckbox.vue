<script setup lang="ts">
import type { CheckboxProps } from 'primevue/checkbox'
import Checkbox from 'primevue/checkbox'
import { h, useAttrs } from 'vue'

const myProps = defineProps<CheckboxProps>()
const myEmits = defineEmits<{
  'update:modelValue': [value: any]
  'change': [event: Event]
  'focus': [event: Event]
  'blur-sm': [event: Event]
}>()
defineSlots<{
  default: () => any
}>()
const attrs = useAttrs()

const preset = {
  root: {
    class: ['relative', 'inline-flex', 'align-bottom', 'cursor-pointer', 'select-none'],
  },
  box: ({ props, context }: { props: any, context: any }) => ({
    class: [
      // Alignment
      'flex',
      'items-center',
      'justify-center',
      // Size
      'size-5',
      // Shape
      'rounded-md',
      'border',
      // Colors
      {
        'border-neutral-icon bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked,
        'border-border bg-primary': context.checked,
      },
      // States
      {
        'peer-hover:border-primary-500 dark:peer-hover:border-primary-400': !props.disabled && !context.checked,
        'peer-hover:bg-primary-600 dark:peer-hover:bg-primary-300 peer-hover:border-primary-700 dark:peer-hover:border-primary-300':
          !props.disabled && context.checked,
        'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20':
          !props.disabled,
        'cursor-default opacity-60': props.disabled,
      },
      // Transitions
      'transition-colors',
      'duration-200',
    ],
  }),
  input: {
    class: [
      'peer',
      'w-full ',
      'h-full',
      'absolute',
      'top-0 left-0',
      'z-10',
      'p-0',
      'm-0',
      'opacity-0',
      'rounded-md',
      'outline-hidden',
      'border-2 border-surface-200 dark:border-surface-700',
      'appareance-none',
      'cursor-pointer',
    ],
  },
  icon: {
    class: [
      'text-base leading-none',
      'w-4',
      'h-4',
      'text-white dark:text-surface-900',
      'transition-all',
      'duration-200',
    ],
  },
}

function CheckboxFC() {
  return h(Checkbox, {
    ...attrs,
    ...myProps,
    'pt': preset,
    'ptOptions': { mergeSections: false, mergeProps: false },
    'onUpdate:modelValue': (value: any) => myEmits('update:modelValue', value),
    'onChange': (event: Event) => myEmits('change', event),
    'onFocus': (event: Event) => myEmits('focus', event),
    'onBlur': (event: Event) => myEmits('blur-sm', event),
  })
}
</script>

<template>
  <label
    :for="myProps.inputId"
    class="flex cursor-pointer items-center"
  >
    <CheckboxFC />
    <div class="ml-2 flex-1 w-full min-w-0 cursor-pointer text-neutral">
      <slot />
    </div>
  </label>
</template>
