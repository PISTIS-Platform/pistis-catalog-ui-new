<script setup lang="ts">
import clsx from 'clsx'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: string
    text?: string
    icon?: string
    iconRight?: string
    iconLeft?: string
    variant?:
      | 'header-1'
      | 'header-2'
      | 'header-3'
      | 'header-4'
      | 'paragraph-1'
      | 'paragraph-2'
      | 'caption'
      | 'numeric'
      | 'button-text'
      | 'code-or-data-tables'
      // by typography types have by-* prefix
      | 'by-heading-1'
      | 'by-heading-2'
      | 'by-heading-3'
      | 'by-heading-4'
      | 'by-heading-5'
      | 'by-caption'
      | 'by-copy-large-regular'
      | 'by-copy-large-semibold'
      | 'by-copy-large-bold'
      | 'by-copy-small-regular'
      | 'by-copy-small-semibold'
      | 'by-copy-small-bold'
      | 'by-copy-mini-regular'
      | 'by-copy-mini-semibold'
      | 'by-copy-mini-bold'
  }>(),
  {
    as: 'span',
    variant: 'paragraph-2',
  },
)

const computedClasses = computed(() =>
  clsx(
    // heading
    {
      'font-bold text-5xl text-surface-text': props.variant === 'header-1',
      'font-semibold text-4xl text-surface-text': props.variant === 'header-2',
      'font-semibold text-3xl text-surface-text': props.variant === 'header-3',
      'font-semibold text-lg text-surface-text': props.variant === 'header-4',

      // by-heading
      'font-display text-surface-text font-bold text-[3.5rem] leading-[3.5rem] md:text-[4.5rem] md:leading[4.75rem]': props.variant === 'by-heading-1',
      'font-display text-surface-text font-bold text-[2rem] leading-[2.5rem] md:text-[3rem] md:leading-[3.5rem]': props.variant === 'by-heading-2',
      'font-sans text-surface-text font-bold text-[1.75rem] leading-[2.375rem] md:font-size[2.5rem] md:leading-[3rem]': props.variant === 'by-heading-3',
      'font-sans text-surface-text font-bold text-[1.375rem] leading-[2rem] md:text-[1.5rem] md:leading-[2.25rem]': props.variant === 'by-heading-4',
      'font-sans text-surface-text font-semibold text-[1.125rem] leading-[1.75rem]': props.variant === 'by-heading-5',
    },
    // paragraph
    {
      'font-semibold text-base': props.variant === 'paragraph-1',
      'font-normal text-base': props.variant === 'paragraph-2',
    },
    // by-caption
    {
      // .75rem/1.125rem
      'font-bold uppercase text-xs leading-[1.125rem] text-surface-text': props.variant === 'caption' || props.variant === 'by-caption',
    },
    // by-copy
    [
      // large
      {
        'text-surface-light text-lg font-normal': props.variant === 'by-copy-large-regular',
        'text-surface-light text-lg font-semibold': props.variant === 'by-copy-large-semibold',
        'text-surface-light text-lg font-bold': props.variant === 'by-copy-large-bold',
      },
      // small
      {
        'text-surface-light text-sm font-normal': props.variant === 'by-copy-small-regular',
        'text-surface-light text-sm font-semibold': props.variant === 'by-copy-small-semibold',
        'text-surface-light text-sm font-bold': props.variant === 'by-copy-small-bold',
      },
      // mini
      {
        'text-surface-light text-xs font-normal': props.variant === 'by-copy-mini-regular',
        'text-surface-light text-xs font-semibold': props.variant === 'by-copy-mini-semibold',
        'text-surface-light text-xs font-bold': props.variant === 'by-copy-mini-bold',
      },
    ],
    // numeric
    // todo: apply roboto condensed
    {
      'font-normal text-sm': props.variant === 'numeric',
    },
    // button-text
    {
      'font-medium text-base uppercase': props.variant === 'button-text',
    },
    // code-or-data-tables
    // todo: apply roboto mono
    {
      'font-normal text-sm': props.variant === 'code-or-data-tables',
    },
  ),
)

const hasIcon = computed(() => props.icon || props.iconRight || props.iconLeft)
</script>

<template>
  <component
    :is="props.as"
    :class="computedClasses"
  >
    <template v-if="hasIcon">
      <span
        class="inline-flex min-w-fit flex-row flex-nowrap items-center gap-2" :class="{
          'flex-row-reverse': props.iconRight,
        }"
      >
        <slot name="icon" :icon="hasIcon"> <i :class="hasIcon" /></slot>
        <slot>{{ text }}</slot>
      </span>
    </template>
    <template v-else>
      <slot>{{ text }}</slot>
    </template>
  </component>
</template>
