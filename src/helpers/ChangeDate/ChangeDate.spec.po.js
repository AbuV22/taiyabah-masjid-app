export default class PageObject {
  constructor(wrapper) {
    this.wrapper = wrapper
  }

  getDateInput() {
    return this.wrapper.find('input')
  }

  async setDateValue(newDate) {
    const input = this.getDateInput()
    await input.setValue(newDate)
  }

  emitted(eventName) {
    return this.wrapper.emitted(eventName)
  }
}
