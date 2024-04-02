class AlpineStoreFactory {
  #Alpine

  constructor(Alpine) {
    this.#Alpine = Alpine
  }

  createStore(key, data) {
    this.#Alpine.store(key, data)
    return this.#Alpine.store(key)
  }
}

function createAlpineStoreFactory(Alpine) {
  return new AlpineStoreFactory(Alpine)
}

export { createAlpineStoreFactory }
