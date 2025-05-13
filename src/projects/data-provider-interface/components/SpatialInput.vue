<script setup>
import { onClickOutside } from '@vueuse/core'
import { getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { getTranslationFor } from '../utils/helpers'

const props = defineProps({
  context: Object,
})
const instance = getCurrentInstance().appContext.app.config.globalProperties.$env
const route = useRoute()

// let listOfVoc: [{ item: 'Country', active: false }, { item: 'Place', active: false }, { item: 'Continent', active: false }],
const listOfVoc = ref([])
const inputText = ref({})
const voc = ref({})
const matches = ref({})
const manURL = ref({})
const store = useStore()

if (props.context.attrs.identifier === 'politicalGeocodingURI') {
  listOfVoc.value.push({ item: 'Municipality Key', active: false }, { item: 'Regional Key', active: false }, { item: 'Municipal Association Key', active: false }, { item: 'District Key', active: false }, { item: 'Government District Key', active: false }, { item: 'State Key', active: false })
}
if (props.context.attrs.identifier === 'spatial') {
  listOfVoc.value.push({ item: 'Country', active: false }, { item: 'Place', active: false }, { item: 'Continent', active: false })
}

watch(inputText, async () => {
  getAutocompleteSuggestions()
})
watch(voc, async () => {
  voc.value = voc.value.toLowerCase()
})
watch(manURL, async () => {
  props.context.node.input({ name: manURL, resource: manURL })
})
onMounted(async () => {
  matches.value = [{ name: '--- Type in anything for a live search of the vocabulary ---', resource: 'invalid' }]

  await nextTick()
  // DOM loaded
  if (props.context.value.name === undefined || props.context.value.name === '') {
    showTable.activeValue = false
  }
  else {
    showTable.activeValue = true
  }
  // console.log(showTable.activeValue);
})

function closeAll() {
  listOfVoc.value.forEach((element) => {
    element.active = false
  })
}
function removeProperty(e) {
  //   props.context.value = {}
  showTable.activeValue = false
  props.context.node.input({})
}
function saveToLocal(el) {
  const pathToLocalStorage = JSON.parse(localStorage.getItem(`dpi_${route.params.property}`))
  let arr
  if (props.context.attrs.identifier === 'politicalGeocodingURI') {
    arr = pathToLocalStorage.Advised['dcatde:politicalGeocodingURI']
  }
  else {
    arr = pathToLocalStorage.Advised['dct:spatial']
  }

  arr.forEach((element, index) => {
    if (Object.keys(element).length === 0) {
      arr.splice(index, 1)
    }
  })
  arr.push(props.context.node._value)
  if (props.context.attrs.identifier === 'politicalGeocodingURI') {
    pathToLocalStorage.Advised['dcatde:politicalGeocodingURI'] = arr
  }
  else {
    pathToLocalStorage.Advised['dct:spatial'] = arr
  }

  localStorage.setItem(`dpi_${route.params.property}`, JSON.stringify(pathToLocalStorage))
}
async function getAutocompleteSuggestions() {
  let vocCache = voc.value

  if (props.context.attrs.identifier === 'politicalGeocodingURI') {
    vocCache = `political-geocoding-${vocCache.toLowerCase().replaceAll(' ', '-')}`

    try {
      const text = inputText.value
      await store.dispatch('dpiStore/requestAutocompleteSuggestions', { voc: vocCache, text, base: instance.api.baseUrl }).then((response) => {
        const results = response.data.result.results.map(r => ({
          name: `${getTranslationFor(r.alt_label, 'en', [])} (${r.id})`,
          resource: r.resource,
        }))
        matches.value = results
      })
    }
    catch (error) {
    }
  }
  else {
    try {
      const text = inputText.value
      await store.dispatch('dpiStore/requestAutocompleteSuggestions', { voc: vocCache, text, base: instance.api.baseUrl }).then((response) => {
        const results = response.data.result.results.map(r => ({
          name: `${getTranslationFor(r.pref_label, 'en', [])} (${r.id})`,
          resource: r.resource,
        }))
        matches.value = results
      })
    }
    catch (error) {
    }
  }
}

var showTable = reactive({
  first: false,
  second: false,
  third: false,
  activeValue: false,
})

const I1 = ref(null)
const I2 = ref(null)
const I3 = ref(null)

onClickOutside(I1, event => showTable.first = false)
onClickOutside(I2, event => showTable.second = false)
onClickOutside(I3, event => showTable.third = false)
function activeInput(e) {
  // console.log('in', showTable);
  if (e === 'showTable')
    showTable.first = !showTable.first
  if (e === 'showVocTable')
    showTable.second = !showTable.second
  if (e === 'showVocEntries') {
    if (showTable.third === true) {
    }
    else {
      showTable.third = !showTable.third
    }
  }
}
function manURLInput(e) {
  props.context.node.input({ name: e.target.value, resource: e.target.value })
}
// console.log(voc);
</script>

<script>
export default {
  data() {
    return {
      man: false,
      vocSearch: false,
    }
  },

}
</script>

<template>
  <div class="d-flex flex-column w-100 spatialWrap">
    <div v-if="!props.context.attrs.multiple && showTable.activeValue" class="d-flex formkit-inner mx-3 mb-3">
      <!-- <div class="infoI">
                <div class="tooltipFormkit">{{ props.context.attrs.info }}</div>
            </div> -->
      <a class="autocompleteInputSingleValue ">{{ props.context.value.name }}</a>
      <div class="removeX" @click="removeProperty" />
    </div>
    <div v-else>
      <div class=" w-100 d-flex">
        <div class="d-flex position-relative w-100 m-3">
          <input
            id="I1" type="text"
            class="selectInputField formkit-inner" readonly="readonly" placeholder="Select input method"
            @click="activeInput('showTable')"
          >
          <ul v-show="showTable.first" ref="I1" class="spatialListUpload">
            <li
              class="choosableItemsAC border-b border-gray-200 p-2"
              @click="activeInput('showTable'); man = true; if (vocSearch) { vocSearch = false; };"
            >
              Manually submit information
            </li>
            <li
              class="choosableItemsAC border-b border-gray-200 p-2"
              @click="activeInput('showTable'); vocSearch = true; if (man) { man = false }"
            >
              Choose from vocabulary
            </li>
          </ul>
        </div>
        <div v-if="man" class="d-flex position-relative w-100 m-3">
          <label class="w-100"> Provide an URL
            <input
              type="URL" class="selectInputField formkit-inner" placeholder="URL"
              @input="manURLInput($event)"
            >
          </label>
        </div>
        <div v-if="vocSearch" class="d-flex position-relative w-100 m-3">
          <label class="w-100"> Choose type of vocabulary
            <input
              id="I2" type="text" class="selectInputField formkit-inner" readonly="readonly"
              placeholder="Search the vocabulary" @click="activeInput('showVocTable');"
            >
          </label>
          <ul v-if="showTable.second" ref="I2" class="spatialListUpload">
            <li
              v-for="el in listOfVoc" :key="el" class="choosableItemsAC border-b border-gray-200 p-2"
              @click=" closeAll(); el.active = !el.active; activeInput('showVocTable'); inputText = ''; voc = el.item"
            >
              {{ el.item }}
            </li>
          </ul>
        </div>
      </div>
      <div v-if="vocSearch" class="m-3">
        <div v-for="el in listOfVoc" :key="el" class="position-relative">
          <label v-if="el.active" class="w-100"> Search the vocabulary <input
            id="I3" v-model="inputText"
            type="text" class="selectInputField formkit-inner" :placeholder="el.item"
            @click="activeInput('showVocEntries'); inputText = ''"
          >
          </label>
          <ul v-if="showTable.third && el.active" ref="I3" class="spatialListUpload">
            <li
              v-for="el in matches" :key="el" class="choosableItemsAC border-b border-gray-200 p-2"
              @click="props.context.node.input(el); inputText = el.name; activeInput('showVocEntries'); showTable.third = false; saveToLocal(el)"
            >
              {{ el.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spatialWrap label {
    font-family: var(--fk-font-family-label);
    font-size: var(--fk-font-size-label);
    font-weight: var(--fk-font-weight-label);
    line-height: var(--fk-line-height-label);
}

.spatialWrap {
    .spatialListUpload {
        width: 100%;
        left: 0;
        top:78px;
    }
}
</style>
