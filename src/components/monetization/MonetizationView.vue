<template>
    <section class="properties-wrapper">
        <!-- <DatasetDetailsProperties></DatasetDetailsProperties> -->

        <div class="metadata-outer-wrapper">
            <div class="metadata-inner-wrapper">
                <!-- <section v-if="filteredData.offer" class="metadata-section">
                    <span class="main-title">Offer</span>
                    <Metadata :data="filteredData.offer" />
                </section> -->
                <section class="metadata-section">
                    <span class="main-title">Monetization</span>
                    <Metadata :data="mockData" />
                </section>
                <!-- <section v-if="filteredData.insights_result" class="metadata-section">
                    <span class="main-title">Insights Result</span>
                    <a :href="filteredData.insights_result" rel="noopener noreferrer">
                        <Metadata :data="filteredData.insights_result" />
                    </a>
                </section> -->
            </div>
        </div>
    </section>
</template>

<script setup>
//import { DatasetDetailsProperties } from '@piveau/piveau-hub-ui-modules';
//import {useRuntimeEnv} from '@piveau/piveau-hub-ui-modules';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Metadata from './Metadata.vue';
import mockData from './mock-data.json'
// const route = useRoute();


// let datasetId = route.params.ds_id.toString();
// const metadata = ref(null)
// const ENV = useRuntimeEnv();
// const filteredData = ref({
//     offer: null,
//     monetization: null,
//     insights_result: null
// });
// const searchUrl = ENV.api.baseUrl

// const fetchMetadata = async () => {
//     const response = await fetch(`${searchUrl}datasets/${datasetId}`);
//     const data = await response.json()

//     metadata.value = data

//     filteredData.value.offer = metadata.value.result.offer;
//     filteredData.value.insights_result = metadata.value.result.insights_result;
//     filteredData.value.monetization = metadata.value.result.monetization
//         .filter(item => !item.visible)
//         .map(item => ({
//             "Transferable": item.transferable,
//             "Downloads": item.downloads,
//             "Type": item.type,
//             "Exclusive": item.is_exclusive,
//             "Termination Date": item.termDate,
//             "Price": item.price,
//             "Personal Data Terms": item.personal_data_terms,
//             "License": item.license ? item.license.description : null
//         }));
// }

// onMounted(() => {
//     fetchMetadata()
// })
</script>

<style>
.dsd-properties {}

.properties-wrapper {
    margin-top: 3rem;
    -webkit-box-shadow: 1px 7px 15px -8px #E4E4E7;
    box-shadow: 1px 7px 15px -8px #E4E4E7;
    border: 2px solid #e4e4e7;
    padding: 1rem;
    border-radius: .5rem;
    width: 100% !important;

    .metadata-outer-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;


        .metadata-inner-wrapper {
            width: 92.5%;

            .metadata-section {
                display: flex;
                border-bottom: 1px solid #e4e4e7 !important;
                padding: 1rem 0;

                .main-title {
                    color: #3f3f46;
                    font-weight: 700;
                    font-size: 1.2rem;
                    width: 21.5%;
                    font-size: 1rem;
                }

                .meta-info {
                    width: 77%;
                    word-wrap: break-word;
                    overflow-wrap: break-word;
                    white-space: normal;


                    div {
                        display: flex;
                        flex-direction: column;
                    }

                    ul {
                        list-style-type: none !important;
                    }
                }
            }
        }
    }
}
</style>
