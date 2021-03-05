export default class Speed {
  constructor () {
    this.value = 0
    this.delay = 1000
  }

  increase () {
    this.value += 1
    this.delay = 1000 - 100 * this.value
  }

  increaseIfNecessary (desiredSpeed) {
    if (desiredSpeed > this.value) {
      this.increase()
      document.getElementById('speedContainer').classList.add('shaken')
      setTimeout(
        () => document.getElementById('speedContainer').classList.remove('shaken'),
        1000
      )
    }
    return this.value
  }
}
