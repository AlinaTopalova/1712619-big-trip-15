export default class Store {
  constructor(storage) {
    this._storage = storage;
  }

  getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items, key) {
    this._storage.setItem(
      key,
      JSON.stringify(items),
    );
  }

  setItem(name, id, value) {
    const store = this.getItems(name);

    this._storage.setItem(
      name,
      JSON.stringify(
        Object.assign({}, store, {
          [id]: value,
        }),
      ),
    );
  }

  removeItem(name, id) {
    const store = this.getItems(name);

    delete store[id];

    this.setItems(store, name);
  }
}
