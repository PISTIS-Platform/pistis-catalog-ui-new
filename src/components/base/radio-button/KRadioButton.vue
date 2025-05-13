<script setup lang="ts">
import type { RadioButtonProps } from 'primevue/radiobutton'
import RadioButton from 'primevue/radiobutton'
import { computed, useAttrs } from 'vue'
import Typography from '../typography/Typography.vue'

defineOptions({
  inheritAttrs: false,
})

const myProps = defineProps<RadioButtonProps>()

const resolvedAttrs = computed(() => ({ ...useAttrs(), ...myProps }))

/**
 * @see https://tailwind.primevue.org/radiobutton/#presets.lara
 */
const pt = {
  root: {
    class: ['relative', 'inline-flex', 'align-bottom', 'w-[1.571rem] h-[1.571rem]', 'cursor-pointer', 'select-none'],
  },
  box: ({ props }: { props: any }) => ({
    class: [
      // Flexbox
      'flex justify-center items-center',
      // Size
      'w-[1.571rem] h-[1.571rem]',
      // Shape
      'border-2',
      'rounded-full',
      // Transition
      'transition duration-200 ease-in-out',
      // Colors
      {
        'text-surface-700 dark:text-white/80': props.value !== props.modelValue && props.value !== void 0,
        'bg-bg-darker dark:bg-surface-900': props.value !== props.modelValue && props.value !== void 0,
        'border-bg-divider dark:border-surface-700':
          props.value !== props.modelValue && props.value !== void 0 && !props.invalid,
        'border-primary-500 dark:border-primary-400': props.value === props.modelValue && props.value !== void 0,
        // 'bg-primary-500 dark:bg-primary-400': props.value === props.modelValue && props.value !== void 0,
      },
      // Invalid State
      { 'border-red-500 dark:border-red-400': props.invalid },
      // States
      {
        'peer-hover:border-primary-500 dark:peer-hover:border-primary-400': !props.disabled && !props.invalid,
        'peer-hover:border-primary-600 dark:peer-hover:border-primary-300 peer-hover:bg-primary-300 dark:peer-hover:bg-primary-500':
          !props.disabled && props.value === props.modelValue && props.value !== void 0,
        'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20':
          !props.disabled,
        'opacity-60 cursor-default': props.disabled,
      },
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
      'appearance-none',
      'cursor-pointer',
    ],
  },
  icon: ({ props }: { props: any }) => ({
    class: [
      'block',
      // Shape
      'rounded-full',
      // Size
      'w-[0.857rem] h-[0.857rem]',
      // Colors
      {
        'bg-btn-regular dark:bg-surface-900': true,
      },
      // Conditions
      {
        'backface-hidden scale-10 invisible': props.value !== props.modelValue,
        'transform visible scale-[1.1]': props.value === props.modelValue,
      },
      // Transition
      'transition duration-200',
    ],
  }),
}
</script>

<template>
  <label
    :for="myProps.inputId"
    class="flex cursor-pointer items-center"
  >
    <RadioButton
      v-bind="resolvedAttrs"
      :pt="pt"
      :pt-options="{ mergeSections: false, mergeProps: false }"
    />
    <Typography
      v-if="$slots.default"
      variant="paragraph-2"
      class="ml-4 flex-1 cursor-pointer"
    >
      <slot />
    </Typography>
  </label>
</template>
