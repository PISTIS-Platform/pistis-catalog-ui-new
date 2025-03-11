import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import LPFooter from '../../../src/components/landing-page/LPFooter.vue'
import { i18n } from '../../../vitest.setup'

describe('lPFooter.vue', () => {
  const mountComponent = () => {
    return shallowMount(LPFooter, {
      global: {
        plugins: [i18n],
      },
    })
  }

  it('renders the footer container', () => {
    const wrapper = mountComponent()
    expect(wrapper.find('.main-container').exists()).toBe(true)
    expect(wrapper.find('.footer-container').exists()).toBe(true)
  })

  it('renders the DKSR logo', () => {
    const wrapper = mountComponent()
    const logo = wrapper.find('img[alt="DKSR logo"]')
    expect(logo.exists()).toBe(true)
    expect(logo.attributes('src')).toBe('/src/assets/images/dksr-logo.svg')
  })

  it('renders the contact information correctly', () => {
    const wrapper = mountComponent()
    const contactLink = wrapper.find('a[href="mailto:product@civora.org"]')
    expect(contactLink.exists()).toBe(true)
    expect(contactLink.text()).toBe('Kontakt: product@civora.org')
  })
})
