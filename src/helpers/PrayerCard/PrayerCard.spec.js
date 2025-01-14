import { mount } from '@vue/test-utils'
import PrayerCard from './PrayerCard.vue'
import { describe, it, expect } from 'vitest'

describe('PrayerCard Component', () => {
  it('renders the correct props', () => {
    const wrapper = mount(PrayerCard, {
      props: {
        name: 'Fajr',
        begPrayerTime: 5,
        jamPrayerTime: '5:30 AM',
      },
    })

    expect(wrapper.find('.prayer-card__name').text()).toBe('Fajr')
    expect(wrapper.find('.prayer-card__begin-time').text()).toBe('5')
    expect(wrapper.find('.prayer-card__jamat-time').text()).toBe('5:30 AM')
  })

  it('handles missing props gracefully', () => {
    const wrapper = mount(PrayerCard, {
      props: {
        name: '',
        begPrayerTime: 0,
        jamPrayerTime: '',
      },
    })

    expect(wrapper.find('.prayer-card__name').text()).toBe('')
    expect(wrapper.find('.prayer-card__begin-time').text()).toBe('0')
    expect(wrapper.find('.prayer-card__jamat-time').text()).toBe('')
  })
})
