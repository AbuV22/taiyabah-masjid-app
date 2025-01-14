export default class PageObject {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  get components() {
    return {
      changeMonthCTA: this.wrapper.find('[data-qa-update-month]'),
    }
  }

  get elements() {
    return {
      inputMonth: this.wrapper.find('[data-qa-input-month]'),
    }
  }

  get actions() {
    return {
      clickCta: async () => {
        const cta = this.components.changeMonthCTA
        if (cta.exists()) {
          await cta.trigger('click')
        } else {
          throw new Error('CTA not found')
        }
      },
    }
  }
}
