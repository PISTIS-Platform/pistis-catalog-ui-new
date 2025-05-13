<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

import LanguageSelector from '../components/LanguageSelector.vue'
import CatalogueOverview from './OverviewPage/CatalogueOverview.vue'
import DatasetOverview from './OverviewPage/DatasetOverview.vue'

export default {
  components: {
    LanguageSelector,
    DatasetOverview,
    CatalogueOverview,
  },
  props: {
    property: {
      type: String,
    },
    context: {
      type: Object,
    },
  },
  data() {
    return {
      dpiLocale: 'en',
      hubUrl: this.$env.api.hubUrl.endsWith('/') ? this.$env.api.hubUrl.slice(0, -1) : this.$env.api.hubUrl,
    }
  },
  computed: {
    ...mapGetters('auth', [
      'getIsEditMode',
    ]),
    ...mapGetters('dpiStore', [
      'getData',
    ]),
    showDatasetsOverview() {
      return this.property === 'datasets'
    },
    showCatalogsOverview() {
      return this.property === 'catalogues'
    },
  },
  methods: {
    ...mapActions('dpiStore', [
      'clearAll',
      'saveLocalstorageValues',
    ]),
    clear() {
      this.clearAll()
    },
    /** * Overview Page checker functionality */
    // checkDatasetMandatory() {
    //   if (!JSON.parse(localStorage.getItem('dpi_mandatory'))['datasets']) {
    //     this.$router.push({
    //       name: 'DataProviderInterface-Input',
    //       params: {
    //         property: 'datasets',
    //         page: 'step1'
    //       },
    //       query: {
    //         error: 'mandatoryDataset',
    //         locale: this.$route.query.locale
    //       }
    //     });
    //   }
    // },
    // checkDistributionMandatory() {
    //   if (!JSON.parse(localStorage.getItem('dpi_mandatory'))['distributions'].length > 0 && !JSON.parse(localStorage.getItem('dpi_mandatory'))['distributions'].every(el => el === true)) {
    //     this.$router.push({
    //       name: 'DataProviderInterface-Input',
    //       path: '/dpi/datasets/distoverview',
    //       params: {
    //         property: 'datasets',
    //         page: 'distoverview',
    //       },
    //       query: {
    //         error: 'mandatoryDistribution',
    //         locale: this.$route.query.locale
    //       },
    //     });
    //   }
    // },
    // checkCatalogueMandatory() {
    //   if (!JSON.parse(localStorage.getItem('dpi_mandatory'))['catalogues']) {
    //     this.$router.push({
    //       name: 'DataProviderInterface-Input',
    //       params: {
    //         property: 'catalogues',
    //         page: 'step1'
    //       },
    //       query: {
    //         error: 'mandatoryCatalog',
    //         locale: this.$route.query.locale
    //       }
    //     });
    //   }
    // },
    checkID(property) {
      // Check uniqueness of Dataset ID
      if (!this.getIsEditMode) {
        this.checkUniqueID(property)
          .then((isUniqueID) => {
            if (!isUniqueID) {
              // Dataset ID not unique / taken in meantime --> Redirect to step1 where the user can choose a new ID
              this.$router.push({
                name: 'DataProviderInterface-Input',
                params: {
                  property,
                  page: 'step1',
                },
                query: {
                  error: 'id',
                  locale: this.$route.query.locale,
                },
              })
            }
          })
      }
    },
    checkUniqueID(property) {
      return new Promise((resolve) => {
        if (this.getData(property)['@id'] !== '') {
          const request = `${this.hubUrl}${property}/${this.getData(property)['@id']}?useNormalizedId=true`
          axios.head(request)
            .then(() => {
              resolve(false)
            })
            .catch(() => {
              resolve(true)
            })
        }
      })
    },
  },
  created() {
    this.$nextTick(() => {
      if (this.property === 'datasets') {
        // this.checkID('datasets');
        // this.checkDatasetMandatory();
        // this.checkDistributionMandatory();
      }

      if (this.property === 'catalogues') {
        // this.checkID('catalogues')
        // this.checkCatalogueMandatory();
      }
    })
  },
}
</script>

<template>
  <div class="col-12">
    <!-- LANGUAGE SELECTOR -->
    <div class="mb-0 mt-5">
      <div class="row">
        <div class="col-10 ">
          {{ $t('message.dataupload.info.selectDisplayLanguage') }}:
          <LanguageSelector v-model="dpiLocale" class="ml-1" />
        </div>
      </div>
    </div>
    <div v-if="showDatasetsOverview" class="mb-3">
      <DatasetOverview :dpi-locale="dpiLocale" />
    </div>
    <div v-if="showCatalogsOverview" class="mb-3">
      <CatalogueOverview :dpi-locale="dpiLocale" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.heading,
.description,
.arrow {
  cursor: pointer;
}

.options,
.download {
  .dropdown-menu {
    min-width: 300px;

    .dropdown-item {
      &:hover {
        color: initial;
        background-color: initial;
      }
    }
  }
}
</style>
