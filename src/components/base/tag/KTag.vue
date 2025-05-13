<script setup lang="ts">
import Chip from 'primevue/chip'
import { computed, toRefs, useAttrs } from 'vue'
import PhX from '~icons/ph/x'
import Typography from '../typography/Typography.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  label?: string
  removable?: boolean
  outline?: boolean
  light?: boolean
  small?: boolean
  interactive?: boolean
  disabled?: boolean
  unselected?: boolean
  icon?: string
  iconLeft?: boolean
  iconRight?: boolean
}>()

const { small, light, outline, interactive, disabled, unselected } = toRefs(props)

const isInteractive = computed(() => props.interactive || props.removable)
const hasIcon = computed(() => props.icon || props.iconLeft || props.iconRight)

const attrs = useAttrs()
const combinedAttrs = computed(() => {
  return {
    ...attrs,
    outline: props.outline,
    small: small.value,
    onClick: () => {},
  }
})

const preset = {
  root: () => ({
    class: [
      // Flexbox
      'flex gap-2 items-center justify-start',

      'h-8',

      // Spacing
      ['px-4 py-1'],

      // Button
      {
        'cursor-pointer': isInteractive.value && !disabled.value,
        'cursor-default': props.disabled,
        // 'focus:ring-3 focus:ring-offset-2 focus:ring-primary-60 outline-hidden': isInteractive.value,
        'hover:bg-primary-80 dark:hover:bg-surface-700': isInteractive.value && !unselected.value && !disabled.value,
        'hover:border-primary-100 hover:text-primary-100 dark:hover:border-surface-700': isInteractive.value && unselected.value && !disabled.value,
      },

      // Shape
      {
        'rounded-3xl': !small.value,
        'rounded-lg': small.value,
      },

      // Colors
      [
        {
          // 'bg-[#015184] text-white': !light.value && !outline.value,
          'bg-primary-20 text-neutral-100 dark:bg-[#015184] dark:text-white': !isInteractive.value,
          'bg-primary-80 text-neutral-0 dark:bg-[#015184] dark:text-white': isInteractive.value && !unselected.value,
          'bg-neutral-60 opacity-60 text-neutral-0 dark:bg-[#015184] dark:text-white': isInteractive.value && disabled.value && !unselected.value,
        },
        // unselected
        {
          'border-primary-80 text-primary-80': isInteractive.value && unselected.value,
          'border-neutral-60 opacity-60 text-neutral-0': isInteractive.value && unselected.value && disabled.value,
        },
      ],

      // Border
      {
        border: isInteractive.value && unselected.value,
      },
    ],
  }),
  label: {
    class: 'text-neutral-100',
    // class: 'leading-6 my-1.5 mx-0',
  },
  icon: {
    class: 'leading-6 mr-2',
  },
  image: {
    class: ['size-9 -ml-3 mr-2', 'rounded-full'],
  },
  removeIcon: {
    class: [
      // Shape
      'rounded-md leading-6',

      // Spacing
      'ml-2',

      // Size
      'size-4',

      // Transition
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer',
    ],
  },
}
</script>

<template>
  <component
    :is="isInteractive ? 'button' : 'span'"
    :class="{
      'focus:ring-3 outline-hidden rounded-2xl focus:ring-primary-60 focus:ring-offset-2': isInteractive,
    }"
    @click.prevent="$emit('click', $event)"
  >
    <Chip
      v-bind="combinedAttrs"
      :pt="preset"
      :pt-options="{ mergeSections: false, mergeProps: false }"
    >
      <div class="flex min-w-fit flex-nowrap items-center gap-2 text-primary-100" :class="{ 'flex-row-reverse': props.iconRight }">
        <PhX v-if="props.removable && !hasIcon" />
        <i v-else-if="hasIcon" :class="props.icon || props.iconLeft || props.iconRight" />
        <slot>
          <Typography variant="by-copy-small-regular">
            {{ props.label }}
          </Typography>
        </slot>
      </div>
    </Chip>
  </component>
</template>
