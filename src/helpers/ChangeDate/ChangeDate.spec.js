import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ChangeDate from './ChangeDate.vue'
import PageObject from './ChangeDate.spec.po'
import { ref } from 'vue'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    defineModel: () => ref(null),
  }
})

vi.mock('vuetify/labs/VDateInput', () => ({
  VDateInput: {
    template: '<input v-bind="$attrs" v-on="$listeners" />',
  },
}))

describe('ChangeDate', () => {
  it('emits "change-date" when the date input value changes', async () => {
    const wrapper = mount(ChangeDate)

    const po = new PageObject(wrapper)

    const newDate = '2025-01-01'
    await po.setDateValue(newDate)

    wrapper.vm.inputDate = newDate
    await wrapper.vm.$nextTick()

    const emittedEvents = po.emitted('change-date')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents[0]).toEqual([newDate])
  })
})
