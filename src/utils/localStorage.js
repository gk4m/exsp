export default {

  ls: window.localStorage,

  set(key, value) {
    this.ls.setItem(key, JSON.stringify(value));
    return this.get(key);
  },

  get(key) {
    try {
      return JSON.parse(this.ls.getItem(key));
    } catch (e) {
      return this.ls.getItem(key);
    }
  },

  remove(key) {
    this.ls.removeItem(key);
  },

  clear() {
    this.ls.clear();
  },
};
