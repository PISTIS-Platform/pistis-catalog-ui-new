<script setup>
import axios from 'axios'
import {
  has,
  isNil,
} from 'lodash-es'
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLink from '../../widgets/AppLink.vue'

const env = getCurrentInstance().appContext.app.config.globalProperties.$env
const store = useStore()
const filteredCatalogs = ref([])
const userCatIDList = computed(() => store.getters['auth/getUserCatalogIds'])

async function filterCatList() {
  let cache
  await axios
    .get(`${env.api.baseUrl}search?filter=catalogue&limit=1000`)
    .then(response => (cache = response))
    .catch((err) => {
      reject(err)
    })

  cache.data.result.results.forEach((e) => {
    if (has(e, 'title') && !isNil(e.title) && has(e, 'id') && !isNil(e.id))
      filteredCatalogs.value.push({ title: Object.values(e.title)[0], id: e.id })
  })

  filteredCatalogs.value = filteredCatalogs.value
    .filter(item => userCatIDList.value.includes(item.id))
    .map(item => ({ id: item.id, name: item.title }))
}
onMounted(async () => {
  filterCatList()
})
</script>

<template>
  <div class="catOverview">
    <div class="d-flex flex-column bg-transparent container-fluid justify-content-between content ">
      <h1 class="small-headline">
        My Catalogues
      </h1>
      <p class="m-0 ">
        Click the catalogues if you want to be redirected to the associated overview Page.
      </p>
      <div class="catWrap">
        <div v-for="(catalog, index) in filteredCatalogs" :key="index" class="annifItems ">
          <AppLink
            :to="{ name: 'CatalogueDetails', query: { locale: $route.query.locale }, params: { ctlg_id: catalog.id } }"
          >
            {{
              catalog.name }}
          </AppLink>
        </div>
        <div v-for="(catalog, index) in userCatIDList" v-if="filteredCatalogs.length === 0" :key="index" class="annifItems ">
          <AppLink
            :to="{ name: 'CatalogueDetails', query: { locale: $route.query.locale }, params: { ctlg_id: catalog } }"
          >
            {{
              catalog }}
          </AppLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.catOverview {
  min-height: 60vh;
}

.catWrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid lightgray;
  justify-content: space-between;
}

.catWrap .annifItems {
  background: #ECECEC;
  grow: 1;
  text-align: center;
}

.subline {
  font-size: 12px;
  color: lightgray;

}
</style>
