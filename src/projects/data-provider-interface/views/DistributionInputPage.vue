<script setup>
import { cloneDeep } from 'lodash-es'
import { nextTick, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import DistributionStepper from '../components/DistributionStepper.vue'

const props = defineProps({
  values: Object,
  schema: Object,
})

const disIndex = ref([])
const store = useStore()

const list = ref({
  disList: [],
})
onMounted(async () => {
  // Load DOM
  await nextTick()
  if (props.values.Distributions.distributionList.length != 0) {
    for (let index = 0; index < props.values.Distributions.distributionList.length; index++) {
      disIndex.value.push(`distribution ${index}`)
      list.value.disList.push({ name: `distribution ${index}`, isActive: false })
    }
  }
})
function addDistribution() {
  list.value.disList.push({ name: `distribution ${list.value.disList.length}`, isActive: false })
  editDis(list.value.disList.length - 1)
}
function editDis(i) {
  list.value.disList.forEach((el, index) => {
    if (i != index) {
      el.isActive = false
    }
  },
  )
  list.value.disList[i].isActive = !list.value.disList[i].isActive
}
function removeDis(i) {
  const newValues = cloneDeep(props.values)
  newValues.Distributions.distributionList.splice(i, 1)

  store.dispatch('dpiStore/saveFormValues', { property: 'datasets', values: newValues })
  list.value.disList.splice(i, 1)
}
function deleteAllDistributions() {
  const newValues = cloneDeep(props.values)
  newValues.Distributions.distributionList = []
  store.dispatch('dpiStore/saveFormValues', { property: 'datasets', values: newValues })

  list.value.disList = []
}
</script>

<template>
  <h1>{{ $t('message.dataupload.info.distributions') }}</h1>
  <hr>
  <div name="distribution-stepper-list" class="distributionsListClass">
    <FormKit type="list" name="distributionList">
      <section v-for="(dist, index) in list.disList" :key="index" class="distributionOuter">
        <div class="d-flex m-4 align-items-center justify-content-between">
          <h2 class="m-0">
            Distribution {{ index + 1 }}
          </h2>
          <div>
            <button class="btn btn-secondary" type="button" @click="editDis(index)">
              {{ $t('message.datasetDetails.edit')
              }}
            </button>
            <button class="btn btn-secondary" type="button" @click="removeDis(index)">
              {{
                $t('message.datasetDetails.delete') }}
            </button>
          </div>
        </div>
        <div class="disInputWrapper" :class="{ 'd-none': !list.disList[index].isActive }">
          <DistributionStepper
            :name="dist.name" :index="index" :schema="props.schema" :values="props.values"
            :distribution-list="disIndex"
          />
        </div>
      </section>
    </FormKit>
    <button type="button" class="btn btn-secondary" @click="addDistribution">
      {{ $t('message.dataupload.info.newDistribution')
      }}
    </button>
    <button type="button" class="btn btn-secondary" @click="deleteAllDistributions">
      {{
        $t('message.dataupload.info.deleteDistribution') }}
    </button>
  </div>
</template>
