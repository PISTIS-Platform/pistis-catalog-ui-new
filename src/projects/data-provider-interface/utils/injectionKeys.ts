import type { InjectionKey, Ref } from 'vue'

export const dpiStepperKey: InjectionKey<{
  steps: Record<string, any>
  activeStep: Ref<string>
  registerStep: (step: string) => void
}> = Symbol('dpiStepperKey')
