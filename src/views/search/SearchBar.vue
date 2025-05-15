<script setup lang="ts">
import KButton from '@/components/base/button/KButton.vue'
import SearchInput from '@/components/search-input/SearchInput.vue'

const props = defineProps<{
  searchAction: Function
}>()

const searchInput = defineModel<string>()
</script>

<template>
  <div class="mt-[5px] flex-none px-6 py-[1.875rem]">
    <section
      name="top"
      class="flex flex-col lg:py-16"
    >
      <form
        class="flex gap-3"
        @submit.prevent="searchAction"
      >
        <SearchInput
          v-model="searchInput"
          disable-dropdown
          class="w-full max-w-[50rem]"
          :placeholder="$t('search.searchBarPlaceholder')"
          :select-options="[]"
        />
        <KButton
          class="h-full text-base"
          size="large"
          type="submit"
        >
          {{ $t('search.searchButton') }}
        </KButton>
      </form>
    </section>
  </div>
</template>
