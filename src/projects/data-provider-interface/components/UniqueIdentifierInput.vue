<script setup>
import axios from 'axios'
import { isNil } from 'lodash-es'
import { getCurrentInstance, onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

const env = getCurrentInstance().appContext.app.config.globalProperties.$env

const store = useStore()
const isEditMode = ref()
const isDuplicate = ref()
isDuplicate.value = localStorage.getItem('dpi_duplicate')
isEditMode.value = store.getters['auth/getIsEditMode']
const { t, locale } = useI18n()

let validationMessages = {
  idformatvalid: '',
  idunique: '',
  required: '',

}

onMounted(() => {
  // This is kind of buggy, its taking the strings from the wrong json (de and en is switched)
  validationMessages = {
    idformatvalid: t('message.dataupload.datasets.datasetID.invalidFormat'),
    idunique: t('message.dataupload.datasets.datasetID.duplicate'),
    required: t('message.dataupload.datasets.datasetID.required'),
  }
})

watchEffect(() => {

})

async function idunique(node) {
  let isUniqueID = true
  const hubUrl = env.api.hubUrl
  const draftIDs = store.getters['auth/getUserDraftIds']

  new Promise(() => {
    if (isNil(node.value) || node.value === '' || node.value === undefined) {
      isUniqueID = true
    }
    else if (draftIDs.includes(node.value)) {
      isUniqueID = false
    }
    else {
      const request = `${hubUrl}datasets/${node.value}?useNormalizedId=true`
      axios.head(request)
        .then(() => {
          isUniqueID = false
        })
        .catch((e) => {
          isUniqueID = true
        })
    }
  })
  return isUniqueID
}

function idformatvalid(node) {
  return /^[a-z0-9-]*$/.test(node.value)
}
</script>

<script>
export default {
  props: ['context'],
}
</script>

<template>
  <div class="formkitProperty DSid">
    <h4>{{ $t(`message.dataupload.datasets.datasetID.label`) }}</h4>
    <FormKit
      v-if="!isEditMode || isDuplicate" id="datasetID" type="text" name="datasetID"
      :placeholder="$t(`message.dataupload.datasets.datasetID.label`)"
      :info="$t(`message.dataupload.datasets.datasetID.info`)" :help="$t(`message.dataupload.datasets.datasetID.help`)"
      :validation-rules="{ idformatvalid, idunique }" validation="idformatvalid|idunique|required"
      validation-visibility="live" :validation-messages="validationMessages" outer-class="formkitCmpWrap p-3"
    />
    <FormKit
      v-else id="datasetID" type="text" name="datasetID" :disabled="true"
      :info="$t(`message.dataupload.datasets.datasetID.info`)" :help="$t(`message.dataupload.datasets.datasetID.help`)"
    />
  </div>
</template>

<style></style>
