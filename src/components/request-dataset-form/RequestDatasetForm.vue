<script setup lang="ts">
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import KButton from '../base/button/KButton.vue'
import KCheckbox from '../base/checkbox/KCheckbox.vue'
import Typography from '../base/typography/Typography.vue'

const emit = defineEmits(['submit'])

const requestPurpose = defineModel<string | null | undefined>('requestPurpose')
const startDate = defineModel<string | Date | string[] | Date[] | null | undefined>('startDate')
const endDate = defineModel<string | Date | string[] | Date[] | null | undefined>('endDate')
const tosEnabled = defineModel<boolean | null | undefined>('tosEnabled')
</script>

<template>
  <form
    class="flex flex-col flex-nowrap gap-16"
    action=""
    @submit.prevent="emit('submit')"
  >
    <div class="flex flex-col flex-nowrap gap-8">
      <Typography
        as="h3"
        variant="header-3"
      >
        Daten anfragen
      </Typography>
      <Typography
        as="p"
        variant="paragraph-2"
      >
        Vielen Dank für ihr Interesse an diesem Datensatz, <br>
        bitte füllen sie die folgenden Felder aus.
      </Typography>
      <div class="flex flex-col gap-2">
        <label for="request-purpose">Zweck der Anwendung</label>
        <InputText
          id="request-purpose"
          v-model="requestPurpose"
        />
      </div>
      <div class="flex flex-row gap-8">
        <div class="flex-1 flex flex-col gap-2">
          <label for="start-date">Start der Anwendung</label>
          <Calendar
            v-model="startDate"
            input-id="start-date"
            show-icon
            icon-display="input"
          />
        </div>
        <div class="flex-1 flex flex-col gap-2">
          <label for="end-date">Ende der Anwendung</label>
          <Calendar
            v-model="endDate"
            input-id="end-date"
            show-icon
            icon-display="input"
          />
        </div>
      </div>
      <div class="flex flex-row flex-nowrap gap-4 pl-4">
        <KCheckbox
          v-model="tosEnabled"
          binary
          input-id="tos-enabled"
          name="tos-enabled"
        >
          AGBs gelesen und akzeptieren
        </KCheckbox>
      </div>
    </div>
    <KButton
      type="submit"
      class="max-w-52"
      label="Anfrage absenden"
    />
  </form>
</template>

<style scoped></style>
