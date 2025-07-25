<template>
  <div class="">
    <Typography variant="by-heading-4">Monetization</Typography>
    <Metadata :data="mockData.monetization[0]" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Metadata from './Metadata.vue'
import mockData from './mock-data.json'

//commented out for dev with mockData
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


