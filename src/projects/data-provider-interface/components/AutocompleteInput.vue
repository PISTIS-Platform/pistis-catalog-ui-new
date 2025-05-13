<script setup>
import { getNode } from '@formkit/core'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
import qs from 'qs'
import { computed, getCurrentInstance, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'vuex'
import { getTranslationFor } from '../utils/helpers'

const props = defineProps({
  context: Object,
})

const instance = getCurrentInstance().appContext.app.config.globalProperties.$env

const store = useStore()
const { t, locale } = useI18n()

const listOfValues = computed(() => {
  return props.context.value
})

let selection
const voc = props.context.attrs.voc

const matchesSearchstring = computed(() => {
  return t('message.dataupload.info.searchVocabulary')
})
const matchesNothingFound = computed(() => {
  return t('message.dataupload.info.matchesNothingFound')
})
const matches = ref({
  value: { name: matchesSearchstring },
})
const activeList = ref()
const dropdownList = ref(null)
const inputText = ref({})
let cacheList = []
const annifList = []
const annifTrigger = ref({
  value: false,
})
const initialValues = ref()
const annifSelectionList = ref({})

onMounted(async () => {
  inputText.value = ''
})
const inDis = computed(() => {
  try {
    if (props.context.attrs.class.includes('inDistribution')) {
      return true
    }
  }
  catch (error) {

  }
})
watch(matches, async () => { })
watch(annifSelectionList, async () => { })

async function requestURIname(res) {
  if (res != undefined) {
    const vocMatch
      = voc === 'iana-media-types'
        || voc === 'spdx-checksum-algorithm'

    let name

    await store.dispatch('dpiStore/requestResourceName', { voc, uri: res, envs: instance }).then(
      (response) => {
        if (props.context.attrs.property === 'dcatde:politicalGeocodingURI') {
          if (response != undefined) {
            const result = vocMatch
              ? response.data.result.results
                .filter(dataset => dataset.resource === res)
                .map(dataset => dataset.alt_label)[0]
                .en
              : getTranslationFor(response.data.result.alt_label, 'en', [])
            name = result
          }
        }
        else {
          if (response != undefined) {
            const result = vocMatch
              ? response.data.result.results
                .filter(dataset => dataset.resource === res)
                .map(dataset => dataset.pref_label)[0]
                .en
              : getTranslationFor(response.data.result.pref_label, 'en', [])
            name = result
          }
        }
      },
    )
    return name
  }
}

watchEffect(async () => {
  const values = listOfValues.value

  // single URI's
  if (values.hasOwnProperty('name')) {
    if (values.name === values.resource) {
      let uriName
      if (!props.context.attrs.multiple) {
        uriName = requestURIname(values.resource)
        props.context.node.input({ name: await uriName, resource: values.resource })
      }
    }
  }
  // multiple URI's
  if (values.length >= 1) {
    const uriNameList = []
    for (let index = 0; index < values.length; index++) {
      if (values[index].name === values[index].resource) {
        uriNameList.push({ name: await requestURIname(values[index].resource), resource: values[index].resource })
        props.context.node.input(uriNameList)
      }
    }
  }
})
function findPropertyToUpdate(trigger) {
  const finalPath = { step: '', prop: props.context.node.name }
  const pathToLocalStorage = JSON.parse(localStorage.getItem('dpi_datasets'))

  for (let index = 0; index < Object.keys(pathToLocalStorage).length; index++) {
    for (let innerIndex = 0; innerIndex < Object.keys(pathToLocalStorage)[index].length; innerIndex++) {
      const ntry = Object.entries((pathToLocalStorage))
      try {
        Object.keys(ntry[index][innerIndex]).filter((e) => {
          if (e === props.context.node.name) {
            finalPath.step = ntry[index][0]

            if (trigger === 'erase') {
              selection = {}
              pathToLocalStorage[finalPath.step][finalPath.prop] = selection
            }
            if (typeof selection === 'object') {
              pathToLocalStorage[finalPath.step][finalPath.prop] = selection
            }
            else {
              pathToLocalStorage[finalPath.step][finalPath.prop] = selection
            }
            localStorage.setItem('dpi_datasets', JSON.stringify(pathToLocalStorage))
          }
        })
      }
      catch (error) {
      }
    }
  }

  window.removeEventListener('click', onClickOutside)
}
onClickOutside(dropdownList, event => activeList.value = false)
async function annifHandlerTheme(input, limit) {
  let finalLimit = 10
  if (limit != undefined) {
    finalLimit = finalLimit + 10
  }

  const query = qs.stringify({
    text: input,
    limit: finalLimit,
  })

  const config = {
    method: 'post',
    url: voc == 'eurovoc'
      ? instance.content.dataProviderInterface.annifLinkSubject
      : instance.content.dataProviderInterface.annifLinkTheme,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    data: query,
  }

  const list = []

  axios(config)
    .then(async (response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        annifList[i] = { name: response.data.results[i].label, resource: response.data.results[i].uri, activeValue: false }
      }
      const annifCacheList = []
      if (listOfValues.value.length > 0) {
        listOfValues.value.forEach((element) => {
          annifCacheList.push({ name: element.name, resource: element.resource, activeValue: true })
        })
      }
      if (response.data.results.length > 9) {
        annifList[annifList.length + 1] = { name: '...', resource: 'invalid', activeValue: false }
      }

      annifSelectionList.value = eraseDuplicates(annifCacheList, annifList)
    })
    .catch((error) => {
      console.log(error)
    })
}
async function updateAnnifselection(item) {
  if (item.resource === 'invalid') {
    fillAnnifsuggestions(5)
  }
  else {
    setValue({ name: item.name, resource: item.resource })
    fillAnnifsuggestions()
  }
}
function eraseDuplicates(array1, array2) {
  const mergedArray = array1.concat(array2)
  const filteredArray = []
  const resourceSet = new Set()

  mergedArray.forEach((obj) => {
    if (!resourceSet.has(obj.resource)) {
      resourceSet.add(obj.resource)
      if (!obj.activeValue) {
        filteredArray.push(obj)
      }
    }
  })

  return filteredArray
}
async function fillAnnifsuggestions(limitChange) {
  const arr = getNode('Mandatory').value['dct:description']
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]['@language'] === 'en') {
      if (limitChange != undefined) {
        await annifHandlerTheme(arr[i]['@value'], 5)
      }
      else {
        await annifHandlerTheme(arr[i]['@value'])
      }
    }
  }
}

// Need to append the classes to the formkit-outer element
props.context.classes.outer += ` autocompleteInput ${props.context.attrs.identifier}`

async function setValue(e) {
  if (Object.keys(e).length === 1) {
    return
  }
  if (listOfValues.value.length > 0) {
    cacheList = listOfValues.value
  }

  // when its a multi input
  if (props.context.attrs.multiple) {
    // check for doubled values
    if (cacheList.length != 0) {
      const filteredProperty = { name: e.name, resource: e.resource }
      const filteredList = cacheList.filter(element => element.name != e.name)
      filteredList.push(filteredProperty)
      selection = filteredList
      await props.context.node.input(selection)
    }
    else {
      cacheList.push({ name: e.name, resource: e.resource })
      selection = cacheList
      await props.context.node.input(selection)
    }
  }
  else if (e.resource === 'invalid') {
    return
  }
  else if (e === 'erase') { await props.context.node.input({}); findPropertyToUpdate(e) }
  else {
    selection = { name: e.name, resource: e.resource }
    await props.context.node.input(selection)
  }
  findPropertyToUpdate()
}

async function getAutocompleteSuggestions(e) {
  const innerText = e.target.value
  console.log(locale)

  await store.dispatch('dpiStore/requestAutocompleteSuggestions', { voc, text: innerText, base: instance.api.baseUrl }).then((response) => {
    const results = response.data.result.results.map(r => ({
      name: `${getTranslationFor(r.pref_label, locale.value, [])} (${r.id})`,
      resource: r.resource,
    }))
    if (results.length === 0) {
      matches.value = { value: { name: matchesNothingFound } }
    }
    else {
      matches.value = results
    }
  })
}

function removeProperty(e) {
  props.context.node.input({})
  setValue('erase')
}
function removeMultipleProperty(e) {
  if (instance.content.dataProviderInterface.annifIntegration) {
    fillAnnifsuggestions()
  }
  if (listOfValues.value.length > 0) {
    cacheList = listOfValues.value
  }
  // Get Index in the array where all values of the Span are stored and cut it out of the list of Values
  cacheList.splice(cacheList.findIndex(element => element.name == e.name), 1)
  selection = cacheList
  props.context.node.input(selection)
  findPropertyToUpdate()
}
</script>

<template>
  <div class="formkitProperty">
    <!-- need to make a condition for the licence property of the distribution - otherwise the dropdown doesnt work -->

    <h4 v-if="inDis" class="formkitHeader">
      {{ $t(`message.dataupload.distributions.${props.context.attrs.identifier}.label`) }}
    </h4>
    <h4 v-if="props.context.attrs.identifier != 'licence' && !inDis">
      {{ $t(`message.dataupload.datasets.${
        props.context.attrs.identifier}.label`) }}
    </h4>

    <div class="formkitCmpWrap">
      <div class="formkit-outer">
        <div v-if="!props.context.attrs.multiple && props.context.value.name" class="d-flex formkit-inner">
          <!-- <div class="infoI">
            <div class="tooltipFormkit">{{ props.context.attrs.info }}</div>
          </div> -->
          <a class="autocompleteInputSingleValue ">{{ props.context.value.name }}</a>
          <div class="removeX" @click="removeProperty" />
        </div>
        <div v-else>
          <div class="d-flex align-items-center justify-content-center formkit-inner mb-2">
            <!-- <div class="infoI">
              <div class="tooltipFormkit">{{ props.context.attrs.info }}</div>
            </div> -->
            <input
              v-model="inputText" class="autocompleteInputfield" :placeholder="props.context.attrs.placeholder"
              type="text" @keyup="getAutocompleteSuggestions($event)" @click="activeList = !activeList"
            >
          </div>
          <ul v-show="activeList" ref="dropdownList" class="autocompleteResultList">
            <li
              v-for="match in matches" :key="match" class="choosableItemsAC border-b border-gray-200 p-2 data-[selected=true]:bg-blue-100"
              @click="setValue(match); activeList = !activeList"
            >
              {{ match.name }}
            </li>
          </ul>
          <div
            v-if="instance.content.dataProviderInterface.annifIntegration && props.context.attrs.annifTheme"
            class="d-flex flex-wrap"
          >
            <div v-for="item in listOfValues" :key="item">
              <div class="activeResultsAutocompleteWrapper">
                <div class="d-flex" @click="item.activeValue = !item.activeValue;">
                  <span>{{ item.name }}</span>
                  <div class="removeX" @click="removeMultipleProperty(item)" />
                </div>
              </div>
            </div>
            <div class="w-100 mt-4">
              <div class="d-flex justify-content-between align-items-center flex-wrap">
                <h3>{{ props.context.label }} - {{ $t('message.dataupload.info.suggestions') }}</h3>
                <span>{{ $t('message.dataupload.info.suggestionText') }}</span>
                <button
                  class="navlikeButton" type="button"
                  @click="fillAnnifsuggestions(); annifTrigger.value = true"
                >
                  {{ $t('message.dataupload.info.tryIt')
                  }}
                </button>
              </div>
              <div v-if="annifTrigger.value" class="annifresultContainer">
                <div v-for="item in annifSelectionList" :key="item" class="d-flex ">
                  <div
                    class="activeResultsAutocompleteWrapper annifResults"
                    :class="{ loadMore: item.resource === 'invalid' }"
                    @click="item.activeValue = !item.activeValue; updateAnnifselection(item)"
                  >
                    <div class="d-flex">
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="d-flex flex-wrap">
            <div v-for="item in props.context.value" :key="item" class="activeResultsAutocompleteWrapper">
              <span>{{ item.name }}</span>
              <div class="removeX" @click="removeMultipleProperty(item)" />
            </div>
          </div>
          <div class="formkit-wrapper">
            <div class="formkit-help">
              {{ props.context.help }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
