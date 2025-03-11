<script setup lang="ts">
interface Props {
  small?: boolean
  big?: boolean
  odp?: boolean
}

defineProps<Props>()
</script>

<template>
  <section class="flex flex-col justify-center items-center w-full">
    <div class="relative flex flex-col items-start w-full max-w-[1280px]">
      <div class="w-full">
        <component
          :is="big ? 'h1' : 'h2'"
          :class="[
            big && !odp ? 'font-display text-white font-semibold text-7xl mb-8' : '',
            big && odp ? 'font-display font-semibold text-7xl mb-8' : '',
            small ? 'font-sans font-bold text-[1.5rem] leading-[2.25rem] text-center mb-16' : '',
            !big && !small ? 'font-display text-[3rem] leading-[3.5rem] text-center mb-16' : '',
            !odp ? 'font-display font-semibold text-primary-10' : '',
          ]"
        >
          <slot name="title" />
        </component>
      </div>
      <slot>content</slot>
    </div>
  </section>
</template>
