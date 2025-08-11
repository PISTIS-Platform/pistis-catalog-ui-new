<script setup lang="ts">
import { useDataTruncator } from '@/composables/useDataTruncator'
import { computed, toValue, ref, onMounted, getCurrentInstance } from 'vue'

import { useRouter } from 'vue-router'
import PhCaretLeft from '~icons/ph/caret-left'
import SummaryBox from '../base/summary-box/SummaryBox.vue'

import axios from 'axios';
import {useStore} from 'vuex'
import { useAuthStore } from '../../stores/authStore'
import TabGroup from '../base/tab-group/TabGroup.vue'

import Typography from '../base/typography/Typography.vue'

import DetailsPageHeader from './DetailsPageHeader.vue'
import LinkedDataSelector from '../base/links/LinkedDataSelector.vue'
import config from '../../../config/appConfig'
import LineageView from '@/data-lineage/LineageView.vue'
import KButton from '../base/button/KButton.vue'



// import keycloak from '@/services/keycloak'

const props = withDefaults(
  defineProps<{
    headline?: string
    title?: string
    subtitle?: string
    datasetId: string
    summary?: { title: string; text: string }[]
    descriptionMarkup?: string
  }>(),
  {
    headline: 'Datensatz',
  }
)

const router = useRouter()
const { appContext } = getCurrentInstance()
const store = useStore()
const authStore = useAuthStore()

const searchUrl = ref(config.piveauHubSearchUrl)
const userFactoryUrl = 'https://pistis-market.eu/srv/factories-registry/api/factories/user-factory'
const pistisMode = config.pistisMode
const distributionID = ref(null)
const accessID = ref(null)
const metadata = ref(null)
const catalog = ref(null)
const token = ref(authStore.user.token)
const factoryPrefix = ref('')
const price = ref('')
const isOwned = ref()  // True only in datasets that the logged-in user owns

const setDistributionID = async (data) => {
  distributionID.value = data['result']['distributions'][0].id
}

const setAccessID = async (data) => {
  try {
    let accessIDFound = false
    for (const distribution of data['result']['distributions']) {
      if (distribution['access_url'] && distribution['access_url'][0]) {
        const parts = distribution['access_url'][0].split('asset_uuid=')
        accessID.value = parts[parts.length - 1]
        accessIDFound = true
        break
      }
    }

    if (!accessIDFound) {
      console.log('No access_url found in distributions.')
    }
  } catch (error) {
    console.error('Error fetching access ID:', error)
  }
}

const fetchMetadata = async () => {
  try {
    const response = await fetch(`${searchUrl.value}datasets/${props.datasetId}`)
    const data = await response.json()
    metadata.value = data
    catalog.value = data.result.catalog.id
    if(pistisMode == 'cloud') {
      console.log(metadata.value.result.monetization[0].price)
      price.value = metadata.value.result.monetization[0].price;
    }

    setAccessID(data)
    setDistributionID(data)
  } catch (error) {
    console.error('Error fetching the metadata. ERROR: ', error)
  }
}

const getUserFactory = async () => {
  try {
    const response = await fetch(`${userFactoryUrl}`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json()
    factoryPrefix.value = data.factoryPrefix
    if(pistisMode == 'cloud') {
      isOwned.value = data.organizationId == metadata.value.result.monetization[0]?.publisher.organization_id;
    }
  } catch (error) {
    console.error("Error getting data:", error);
  }
};

const buyRequest = async (factoryPrefix) => {
    try {
      // TODO: link as ENV variable, and add the access token once keycloak is intigrated
      const response = await axios.post(`https://${factoryPrefix}.pistis-market.eu/srv/smart-contract-execution-engine/api/scee/storePurchase`, {
          // The request body object
          assetId: props.datasetId,
          assetFactory: metadata.value.result?.monetization[0]?.publisher?.organization_id,
          sellerId: metadata.value.result?.monetization[0]?.seller_id,
          price: metadata.value.result?.monetization[0]?.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // TODO: first use default language and only then the fallback
      await store.dispatch('snackbar/showSnackbar', {
        message: `Successfully purchased ${Object.values(metadata.value.result?.title)[0]}`,
        variant: 'success',
      })
    } catch (error) {
      console.error(error)
      const errorMessage = error?.response?.data?.reason || 'An error occurred while processing your request.';
      await store.dispatch('snackbar/showError', errorMessage)
    }
  };

onMounted(() => {
  fetchMetadata()
  getUserFactory();
})


// Dataset desecription truncator "show more"
const {
  data: truncatedDescription,
  toggle: toggleDescription,
  isTruncated: isDescriptionTruncated,
  isTruncationNeeded: isDescriptionTruncationNeeded,
} = useDataTruncator({
  data: computed(() => props.descriptionMarkup || ''),
  limit: 550,
})

const truncatedEllipsedDescription = computed(() => {
  if (toValue(isDescriptionTruncated)) {
    return `${truncatedDescription.value}...`
  }
  return truncatedDescription.value
})

// Distribution truncator ("show more")
// const {
//   data: truncatedFormattedDistributions,
//   toggle: showAllDistributions,
//   isTruncated: isDistributionsTruncated,
// } = useDataTruncator({
//   data: getFormattedDistributions,
//   limit: 7,
// })
</script>

<template>
  <!-- <div
      v-if="error"
      class="grid size-full place-content-center bg-bg-base"
    >
      <KCard class="size-96">
        <template #title>
          Fehler
        </template>
<template #content>
          {{ errorView }}
        </template>
</KCard>
</div> -->
  <div class="container mx-auto p-8">
    <div class="mx-auto mb-12 w-full max-w-content-max space-y-12 pt-1">
      <section
        name="dsd-header"
        class="flex flex-col gap-12">
        <!-- Go previous page -->
        <div class="flex flex-col gap-12">
          <div class="flex justify-between">
            <button
              class="-ml-6 mt-[10px] px-4 py-1 cursor-pointer"
              @click="router.back()">
              <Typography
                variant="paragraph-1"
                class="flex items-center gap-2 text-primary hover:text-primary-hover">
                <PhCaretLeft />
                <span>back</span>
              </Typography>
            </button>
            <LinkedDataSelector
              :resource-id="datasetId"
              resource="datasets" />
          </div>
          <DetailsPageHeader
            :headline="headline"
            :title="title"
            :subtitle="subtitle">
            <template #subtitle>
              <slot
                name="subtitle"
                :subtitle="subtitle">
                <span>{{ subtitle }}</span>
                <!-- <RouterLink :to="{ name: 'Datasets', query: { catalog: resultEnhanced?.getCatalogId } }" class="by-link" /> -->
              </slot> </template
            >temp
          </DetailsPageHeader>
        </div>
        <!-- Metadata -->
        <slot name="metadata">
          <div class="mb-12 flex flex-col justify-between md:flex-row">
            <SummaryBox
              v-for="(s, i) in summary"
              :key="i"
              class="mb-4 mr-4 flex-1"
              :title="s.title"
              :text="s.text || '-'" />
            <!-- <SummaryBox class="mb-4 mr-4 flex-1" title="Datenbereitsteller" :text="resultEnhanced?.getPublisher?.name || '-'" />
              <SummaryBox class="mb-4 mr-4 flex-1" title="Aktualisiert" :text="resultEnhanced?.getModified || '-'" /> -->
          </div>
        </slot>

        
      </section>
      <section class="my-12">
        <TabGroup
          :tabs="[
            {
              id: 'dataset',
              title: 'Info',
              content: truncatedEllipsedDescription || '',
            },
          ]"
          class="">
          <template #default="{ id, content }">
            <template v-if="id === 'dataset'">
              <div class="flex flex-col gap-4">
                <div>
                  <Typography
                    as="h5"
                    variant="by-heading-4"
                    class="mb-8">
                    <slot name="about-this-dataset"> Über diesen Datensatz </slot>
                  </Typography>
                  <Typography
                    as="p"
                    variant="by-copy-small-regular">
                    <div
                      class="markdown-content"
                      v-html="content" />
                  </Typography>
                </div>
                <button
                  v-if="isDescriptionTruncationNeeded"
                  class="grid w-full place-content-center"
                  @click="toggleDescription">
                  <div class="flex flex-col items-center justify-center text-primary text-xs/6 font-bold">
                    <span>Mehr lesen</span>
                    <i
                      v-if="isDescriptionTruncated"
                      class="icon-[ph--caret-down]" />
                    <i
                      v-else
                      class="icon-[ph--caret-up]" />
                  </div>
                </button>
              </div>
            </template>
          </template>
        </TabGroup>
      </section>
      <!-- Cloud (Marketplace) -->
      <div v-if="pistisMode === 'cloud'">
        <section class="container custom_nav_container">
          <div class="btn_holder flex gap-5 flex-wrap">
            <a :href="'#'" @click.prevent="buyRequest(factoryPrefix)" class="">
              <KButton>Buy<span v-if="price">&nbsp;{{ price + '€' }}</span></KButton>
            </a>
            <a
              :href="`/usage-analytics/${datasetId}/questionnaire`"
              class=""
              >
              <KButton v-if="isOwned === false">Provide Feedback</KButton>
            </a>
          </div>
        </section>
      </div>
      <!-- Factory (My Data) -->
      <div v-else-if="pistisMode === 'factory'">
        <section class="container custom_nav_container">
          <template v-if="catalog === 'my-data'">
            <div class="btn_holder flex gap-5 flex-wrap">
              <!-- Data Lineage -->
              <RouterLink
                to="/data-lineage"
                class="">
                <KButton>{{ $t('navigation.data-lineage') }}</KButton>
              </RouterLink>
              <a
                :href="`/srv/catalog/datasets/${datasetId}/quality`"
                class="link"
                ><KButton>Quality Assessment</KButton></a
              >
              <a
                :href="`/data/publish-data/${datasetId}`"
                class="link"
                ><KButton>Publish Data</KButton></a
              >
            </div>
          </template>
          <template v-if="catalog === 'acquired-data'">
            <div class="btn_holder">
              <a
                :href="`/srv/catalog/datasets/${datasetId}/quality`"
                class="link"
                >Quality Assessment</a
              >
              <a
                :href="`/usage-analytics/${datasetId}/questionnaire`"
                class="link"
                >Provide Feedback</a
              >
            </div>
          </template>
        </section>
      </div>
      <slot name="sections">
        <!-- <section class="space-y-4">
            <div class="my-12 flex flex-row items-center gap-2">
              <h2 class="text-[2.5rem] font-bold leading-[3rem] text-primary-100">
                Distributionen
              </h2>
              <KTag interactive class="rounded-full bg-primary-90">
                {{
                  getFormattedDistributions?.length
                }}
              </KTag>
            </div>
            <div class="h-px w-full bg-bg-divider" />
            <div name="distribution-cards" class="relative">
              <template v-for="(distribution, i) in truncatedFormattedDistributions" :key="distribution.id">
                <div name="distribution-card-wrapper" class="relative">
                  <DistributionCard
                    :title="distribution.title || ''"
                    :description="distribution.descriptionMarkup || ''"
                    :format="distribution.format || 'Unknown'"
                    :download-url="distribution.downloadUrls?.[0]!"
                    :last-updated="distribution.modified"
                    :data="distribution.data"
                    :linked-data="distribution.linkedData"
                  />
                  <div
                    v-if="i === truncatedFormattedDistributions.length - 1 && isDistributionsTruncated"
                    name="distribution-card-overlay"
                    class="absolute left-0 top-0 size-full bg-linear-to-b from-transparent from-0% to-white to-55%"
                  >
                    <div class="absolute bottom-0 flex w-full flex-row items-center justify-center">
                      <div>
                        <KButton
                          icon="icon-[ph--eye-fill]"
                          size="small"
                          severity="secondary"
                          :label="`Mehr anzeigen (${getFormattedDistributions.length})`"
                          icon-pos="left" @click="showAllDistributions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </section>
          <div
            v-if="(resultEnhanced?.getCategories?.length || 0) > 0"
            class="space-y-3"
          >
            <Typography
              variant="by-heading-4"
              class="font-semibold text-primary"
            >
              Kategorien
            </Typography>
            <div class="flex flex-row gap-2">
              <KTag
                v-for="category in resultEnhanced?.getCategories"
                :key="category.id"
                interactive
                @click="router.push({ name: 'Datasets', query: { categories: category.id } })"
              >
                {{ getLocalizedValue({ obj: category.label, fallbackLocale: 'de' }) }}
              </KTag>
            </div>
          </div>
          <div class="h-px w-full bg-bg-divider" />
          <div class="space-y-4">
            <div class="flex flex-col gap-4 pt-12">
              <Typography
                variant="by-heading-4"
                class="text-primary"
              >
                Zusätzliche Informationen
              </Typography>
              <PropertyTable
                v-if="isSuccess"
                :node="{
                  type: 'node',
                  id: 'a',
                  label: 'a',
                  data: resultEnhanced?.getPropertyTable2 || undefined,
                }"
              />
            </div>
          </div> -->
      </slot>
    </div>
  </div>
</template>
