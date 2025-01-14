import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import PageObject from './ChangeMonth.spec.po'
import ChangeMonth from './ChangeMonth.vue'

function setup(props = {}) {
  return new PageObject(mount(ChangeMonth, { props }))
}

describe('Component: Change Month', () => {
  let pageObject

  beforeEach(() => {
    pageObject = setup()
  })

  describe('When the page loads', () => {
    it('Should have an input and a button', () => {
      expect(pageObject.elements.inputMonth.html()).include('<input placeholder="Month">')
      expect(pageObject.elements.inputMonth.html()).include('</button>')
    })
    it('The change month button should appear', () => {
      expect(pageObject.components.changeMonthCTA.exists()).toBe(true)
    })
  })

  describe('When CTA is clicked', () => {
    it('Should emit an event', async () => {
      await pageObject.actions.clickCta()
      expect(pageObject.wrapper.emitted('change-month')).toBeTruthy()
    })
  })
})
