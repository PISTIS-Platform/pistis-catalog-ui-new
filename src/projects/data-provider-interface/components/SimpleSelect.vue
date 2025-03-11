<script setup>
import { getNode } from '@formkit/core'
import { FormKit } from '@formkit/vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import {
  has,
  isNil,
} from 'lodash-es'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRuntimeEnv } from '../composables/useRuntimeEnv.ts'

const props = defineProps({
  context: Object,
})

const isDuplicate = computed(() => localStorage.getItem('dpi_duplicate'))
const userCats = computed(() => store.getters['auth/getUserCatalogIds'])
const showList = ref()
const store = useStore()
const dropdownList = ref(null)
const isEditMode = ref()
const validationTrigger = ref(true)
isEditMode.value = computed(() => store.getters['auth/getIsEditMode'])
const filteredCatalogs = ref([])
const env = useRuntimeEnv()
const catVal = ref()

catVal.value = getNode('dcat:catalog').value

onClickOutside(dropdownList, event => showList.value = false)

async function setvalue(e) {
  validationTrigger.value = false
  if (e.id) {
    props.context.node.input(e.id)
    showList.value = !showList.value
    getNode('dcat:catalog').value = e.id
    catVal.value = e.name
  }
  else {
    props.context.node.input(e)
    showList.value = !showList.value
    getNode('dcat:catalog').value = e
    catVal.value = e
  }
}
async function filterCatList() {
  let cache
  await axios
    .get(`${env.api.baseUrl}search?filter=catalogue&limit=1000`)
    .then(response => (cache = response))
    .catch((err) => {
      reject(err)
    })

  cache.data.result.results.forEach((e) => {
    console.log(cache)

    if (has(e, 'title') && !isNil(e.title) && has(e, 'id') && !isNil(e.id))
      filteredCatalogs.value.push({ title: Object.values(e.title)[0], id: e.id })
  })

  filteredCatalogs.value = await filteredCatalogs.value
    .filter(item => userCats.value.includes(item.id))
    .map(item => ({ id: item.id, name: item.title }))

  // Check if theres only one catalog and set it directly

  const clone = JSON.parse(JSON.stringify(filteredCatalogs.value))
  if (clone.length === 1) {
    catVal.value = clone[0].id
  }
}

onMounted(async () => {
  filterCatList()
})
</script>

<template>
  <div class="formkitProperty">
    <h4>{{ props.context.label }}</h4>
    <div class="position-relative formkitCmpWrap">
      <FormKit
        v-if="isEditMode.value && !isDuplicate" class="autocompleteInputfield" type="text" readonly
        :placeholder="getNode('dcat:catalog').value" :name="props.context.node.name"
      />
      <FormKit
        v-else v-model="catVal" class="autocompleteInputfield"
        :placeholder="props.context.attrs.placeholder" type="text" validation="required"
        mandatory="true" readonly :validation-messages="{
          required: props.context.attrs.placeholder,
        }" :name="props.context.node.name" @click="showList = !showList"
      />

      <ul v-show="showList" ref="dropdownList" class="autocompleteResultList selectListFK catSelectList">
        <li
          v-for="match in filteredCatalogs" :key="match" class="p-2 border-b border-gray-200 data-[selected=true]:bg-blue-100 choosableItemsAC"
          @click="setvalue(match)"
        >
          {{
            match.name }}
        </li>
        <li
          v-for="idMatch in userCats" v-if="filteredCatalogs.length === 0" :key="idMatch"
          class="p-2 border-b border-gray-200 data-[selected=true]:bg-blue-100 choosableItemsAC"
          @click="setvalue(idMatch)"
        >
          {{
            idMatch }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.catSelectList {
    width: 97.3% !important;
    margin: 0 1rem;
}

.selectListFK {

    max-height: 20rem;
    overflow: overlay;
    overflow-x: hidden;
}
</style>
