<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MatchingDatasetDetails from './MatchingDatasetDetails.vue';

const t = useI18n()

const datasetId = '8c1e448b-18c9-48e4-aa6b-4888046cd1a1';

</script>

<template>
    <div class="pb-5">
        <Typography variant="by-heading-4"> {{$t('matchmaking-service.recommendations-header')}}</Typography>
    </div>
    <MatchingDatasetDetails :datasetId="datasetId"/>
</template>

