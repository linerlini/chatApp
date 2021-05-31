const store = {
  storage: window ? window.localStorage : null,
  session: {
    storage: window ? window.sessionStorage : null,
  },
};

function serialize(val) {
  return JSON.stringify(val);
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined;
  }
  return JSON.parse(val);
}

const api = {
  set(key, val) {
    if (this.disabled) {
      return;
    }
    this.storage.setItem(key, serialize(val));
  },
  get(key) {
    if (this.disabled) {
      return undefined;
    }
    return deserialize(this.storage.getItem(key));
  },
  has(key) {
    if (this.disabled) {
      return false;
    }
    return this.get(key) === undefined;
  },
  remove(key) {
    if (this.disabled) {
      return;
    }
    this.storage.removeItem(key);
  },
  clear() {
    if (this.disabled) {
      return;
    }
    this.storage.clear();
  },
  getAll() {
    if (this.disabled) {
      return undefined;
    }
    const { length } = this.storage;
    const res = {};
    for (let i = 0; i < length; i += 1) {
      const key = this.storage.key(i);
      res[key] = this.get(key);
    }
    return res;
  },
  bianli(func) {
    const res = this.getAll();
    Object.keys(res).forEach((item) => {
      func(res[item]);
    });
  },
};
Object.assign(store, api);
Object.assign(store.session, api);
try {
  const testKey = 'test';
  store.set(testKey, testKey);
  if (store.get(testKey) !== testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (err) {
  store.disabled = false;
}
export default store;
