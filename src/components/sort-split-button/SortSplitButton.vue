<script setup lang="ts">
import { clsx } from 'clsx'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const showDropdown = ref(false)
const sortDirection = defineModel<string>('direction', { default: 'desc' })
const sortDirectionClass = computed(() =>
  clsx([
    'mr-2 text-surface-text',
    {
      'icon-[ph--arrow-up]': sortDirection.value === 'asc',
      'icon-[ph--arrow-down]': sortDirection.value === 'desc',
    },
  ])
)
const checked = computed({
  get() {
    return sortDirection.value === 'asc'
  },
  set(value: boolean) {
    sortDirection.value = value ? 'asc' : 'desc'
  },
})

const sortOptions = computed(() => [
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.modified'), id: 'modified' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.relevance'), id: 'relevance' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.title'), id: 'title.de' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.issued'), id: 'issued' },
])
const sort = defineModel<string>('sort', { default: 'modified' })

const selectedOption = computed(() => sortOptions.value.find((opt) => opt.id === sort.value)?.name ?? '')

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectOption(id: string, name: string) {
  sort.value = id
}

function toggle() {
  checked.value = !checked.value
}
</script>

<template>
  <div class="relative w-full flex">
    <div class="relative rounded-r-none md:w-56 inline-flex rounded-full bg-surface border cursor-pointer">
      <button
        @click="toggleDropdown"
        class="flex-auto font-light px-3 py-2 flex items-center justify-between">
        {{ selectedOption }}
        <i class="icon-[ph--caret-down] text-surface-text text-xs" />
      </button>

      <div
        v-if="showDropdown"
        class="absolute z-10 w-full  top-full border dark:border rounded-md shadow-md bg-surface-0 dark:bg-surface-800 text-surface-800 dark:text-white/80 dark:border-surface-700 max-h-[200px] py-3"
      >
        <ul
          v-for="option in sortOptions"
          :key="option.id"
          :value="option.id">
          <li
            @click="selectOption(option.id, option.name)"
            class="leading-none m-0 py-3 px-5 font-light dark:bg-primary-400/40 text-primary-700 dark:text-white/80 cursor-pointer hover:bg-gray-hover"
            :class="{ 'bg-blue-400/20': option.id === sort }">
            {{ option.name }}
          </li>
        </ul>
      </div>
    </div>

    <button
      @click="toggle"
      class="rounded-l-none pl-3 pr-4 rounded-full border border-surface-200 dark:border-surface-700 cursor-pointer bg-surface font-light flex items-center">
      <i
        :class="sortDirectionClass"
        class="!text-xs" />
      {{
        checked
          ? t('kdw.components.sort-split-button.SortSplitButton.toggleButton.ascending')
          : t('kdw.components.sort-split-button.SortSplitButton.toggleButton.descending')
      }}
    </button>
  </div>
</template>

<style scoped></style>
