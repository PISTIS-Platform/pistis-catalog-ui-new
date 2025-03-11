<script setup lang="ts">
import Typography from '../base/typography/Typography.vue'

const props = withDefaults(
  defineProps<{
    icon?: string
    title?: string
    description?: string
    inputId: string
    inputValue: string
  }>(),
  {
    icon: 'icon-[ph--download]',
  },
)

const checked = defineModel('modelValue', {
  default: '',
})
</script>

<template>
  <input
    :id="props.inputId"
    v-model="checked"
    :value="props.inputValue"
    type="radio"
    class="absolute top-0 left-0 w-0 h-0 opacity-0 peer"
  >
  <label
    :for="props.inputId"
    class="block cursor-pointer px-4 py-8 peer-checked:border-btn-pressed peer-checked:border-2 peer-focus:ring-offset-2 peer-focus:ring rounded-lg border border-bg-divider"
  >
    <div class="relative flex flex-col flex-nowrap gap-6">
      <div
        name="icon-and-txt"
        class="flex-1 h-full flex flex-col flex-nowrap gap-4 p-0"
      >
        <i :class="props.icon" />
        <Typography variant="header-4"> {{ props.title }}</Typography>
        <Typography
          as="p"
          variant="paragraph-2"
          class="text-content-icon flex-1 line-clamp-4"
        >
          Umfassende Übersicht über den aktuellen Zustand des Stadtverkehrs, einschließlich Verkehrsstaus, Unfällen und
          Straßenarbeiten.
        </Typography>
      </div>
      <div
        name="actions"
        class="flex-none w-full"
      >
        <a
          href="#"
          class="flex flex-row flex-nowrap justify-between"
        >
          <span class="text-btn-primary">Zum Dashboard</span>
          <i class="icon-[ph--arrow-right-bold] text-btn-primary" />
        </a>
      </div>
    </div>
  </label>
</template>

<style scoped></style>
