import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { useAuthStore } from '../../../src//stores/authStore'
import LPHeader from '../../../src/components/landing-page//LPHeader.vue'
import { i18n } from '../../../vitest.setup'

describe('lPHeader.vue', () => {
  const mockAuthStore = (registrationURL = '') => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const authStore = useAuthStore()
    authStore.registrationURL = registrationURL

    return authStore
  }

  const mountComponent = (registrationURL = '') => {
    const pinia = createPinia()
    setActivePinia(pinia)
    mockAuthStore(registrationURL)

    return shallowMount(LPHeader, {
      global: {
        plugins: [i18n, pinia],
        stubs: ['RouterLink'],
      },
    })
  }

  it('does not render the registration link when registrationURL is not present', () => {
    const wrapper = mountComponent()

    const registrationLink = wrapper.find('a.header-icon-container.active')
    expect(registrationLink.exists()).toBe(false)
  })

  it('renders other header elements correctly', () => {
    const wrapper = mountComponent()

    expect(wrapper.find('.main-container').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'COSLanguageSwitch' }).exists()).toBe(true)
  })
})
