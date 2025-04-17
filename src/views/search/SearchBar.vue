<template>
  <div class="mt-[15px] flex-none px-6 py-[1.875rem]">
    <section
        name="top"
        class="flex flex-col py-16"
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

<script setup lang="ts">
import SearchInput from "@/components/search-input/SearchInput.vue";
import KButton from '@/components/base/button/KButton.vue';

const props = defineProps<{
  searchAction: Function
}>();

const searchInput = defineModel<string>();

</script>
