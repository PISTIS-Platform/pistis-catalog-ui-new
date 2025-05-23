<script setup lang="ts">
import { clsx } from 'clsx'
import Dropdown from 'primevue/dropdown'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const sortDirection = defineModel<string>('direction', { default: 'desc' })
const sortDirectionClass = computed(() =>
  clsx([
    'mr-2 text-surface-text',
    {
      'icon-[ph--arrow-up]': sortDirection.value === 'asc',
      'icon-[ph--arrow-down]': sortDirection.value === 'desc',
    },
  ]),
)
const checked = computed({
  get() {
    return sortDirection.value === 'asc'
  },
  set(value: boolean) {
    sortDirection.value = value ? 'asc' : 'desc'
  },
})

function toggle() {
  checked.value = !checked.value
}

const sortOptions = computed(() => [
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.modified'), id: 'modified' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.relevance'), id: 'relevance' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.title'), id: 'title.de' },
  { name: t('kdw.components.sort-split-button.SortSplitButton.sortOptions.issued'), id: 'issued' },
])
const sort = defineModel<string>('sort', { default: 'modified' })
</script>

<template>
  <div class="relative">
    <div class="w-full flex"> 
        <Dropdown
        v-model="sort"
        :options="sortOptions"
        option-label="name"
        option-value="id"

        class="w-full items-center rounded-r-none md:w-56"
      >
        <template #dropdownicon>
          <i class="icon-[ph--caret-down] text-surface-text" />
        </template>
      </Dropdown>
      <button 
        @click="toggle"
        class="rounded-l-none border-r-0 pl-3 pr-4 rounded-full border border-surface-200 dark:border-surface-700 cursor-pointer bg-white font-light flex items-center"
      >
        <i :class="sortDirectionClass" class="!text-xs"/>
        {{ checked ? t('kdw.components.sort-split-button.SortSplitButton.toggleButton.ascending') : t('kdw.components.sort-split-button.SortSplitButton.toggleButton.descending')}}
      </button> 
    </div>
  </div>
</template>

<style scoped></style>
