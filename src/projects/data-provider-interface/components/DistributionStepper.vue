<script>
import { useWindowScroll } from '@vueuse/core'
import { defineComponent, markRaw } from 'vue'
import { mapGetters } from 'vuex'
import InputPageStep from '../components/InputPageStep.vue'
import { useDpiStepper } from '../composables/useDpiStepper'
import SelectControlledGroup from './SelectControlledGroup.vue'

export default defineComponent({
  components: {
    InputPageStep,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    index: {
      required: true,
    },
    schema: {
      required: true,
      type: Object,
    },
    context: {
      type: Object,
    },
    distributionIsCollapsed: {
      type: Boolean,
    },
    collapseDistributions: {
      type: Function,
    },
    deleteDistribution: {
      type: Function,
    },
  },
  data() {
    return {
      isCollapsed: false,
      camel2title: str =>
        str
          .replace(/([A-Z])/g, match => ` ${match}`)
          .replace(/^./, match => match.toUpperCase())
          .trim(),
      isActive: false,
    }
  },
  methods: {
    editDistribution() {
      this.isCollapsed = !this.isCollapsed
      this.collapseDistributions(this.index)
    },
    scrollToTop() {
      const { x, y } = useWindowScroll({ behavior: 'smooth' })
      y.value = 0
    },
  },
  computed: {
    ...mapGetters('dpiStore', [
      'getNavSteps',
    ]),
    getName() {
      return this.name
        || values.Distributions.distributionList[this.name - 1].Mandatory['dcat:accessURL'][0]['@id']
    },
  },
  watch: {
    distributionIsCollapsed: {
      handler(newValue) {
        this.isCollapsed = newValue
      },
    },
  },
  created() { },
  setup() {
    const {
      steps,
      activeStep,
      visitedSteps,
      previousStep,
      nextStep,
      stepPlugin,
      goToNextStep,
      goToPreviousStep,
    } = useDpiStepper()

    const checkStepValidity = (stepName) => {
      return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
    }

    const library = markRaw({
      SelectControlledGroup,
    })

    return {
      steps,
      visitedSteps,
      activeStep,
      previousStep,
      nextStep,
      stepPlugin,
      checkStepValidity,
      goToNextStep,
      goToPreviousStep,

      library,
    }
  },
})
</script>

<template>
  <FormKit type="form" :actions="false" :plugins="[stepPlugin]">
    <div name="distribution-stepper" class="singleDistributions">
      <div v-if="!isCollapsed" class="disInfoWrapper">
        <ul class="steps">
          <li
            v-for="(step, stepName, index) in steps" :key="index" class="step"
            :data-step-active="activeStep === stepName" :data-step-valid="step.valid && step.errorCount === 0" :class="{
              'activeItem': activeStep === stepName, 'inactiveStep': stepName != activeStep, 'has-errors': checkStepValidity(stepName),
            }" @click="activeStep = stepName"
          >
            <div class="stepBubbleWrap">
              <div class="circle stepCircle">
                {{ index + 1 }}
              </div>
              <span
                v-if="checkStepValidity(stepName)" class="step--errors"
                v-text="step.errorCount + step.blockingCount"
              />
              {{ $t(`message.dataupload.steps.${stepName}Step`) }}
            </div>
            <div
              v-if="index + 1 != Object.keys(getNavSteps($env.content.dataProviderInterface.specification).distributions).length"
              class="seperatorHorizontalStepper"
            />
            <div v-if="activeStep === 'overview'" class="seperatorHorizontalStepper" />
          </li>
          <li v-if="activeStep === 'overview'" class="step inactiveStep">
            <div class="circle stepCircle" />
          </li>
        </ul>
        <div class="d-flex flex-column w-100">
          <div
            v-for="(stepName, index) in getNavSteps($env.content.dataProviderInterface.specification).distributions"
            :key="index"
          >
            <InputPageStep :name="stepName">
              <!-- <PropertyChooser></PropertyChooser> -->
              <FormKitSchema :schema="schema[stepName]" :library="library" />
              <p v-if="stepName === 'Mandatory'" class="p-1">
                <b>*</b> {{ $t('message.dataupload.steps.MandatoryStep')
                }}
              </p>
            </InputPageStep>
          </div>
        </div>
      </div>
    </div>
  </FormKit>
  <div class="d-flex justify-content-end m-3">
    <button type="button" class="btn btn-secondary" @click="goToPreviousStep(); scrollToTop();">
      {{ $t('message.dataupload.steps.previousDisStep')
      }}
    </button>
    <button type="button" class="btn btn-secondary ml-3" @click="goToNextStep(); scrollToTop();">
      {{ $t('message.dataupload.steps.nextDisStep')
      }}
    </button>
  </div>
</template>

<style></style>
