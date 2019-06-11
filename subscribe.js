~function anonymous() {
  class Subscribe {
    constructor() {
      this.pond = [];
    }

    add(fn) {
      let {pond} = this;
      for (let i = 0; i < pond.length; i++) {
        if (fn === pond[i]) return;
      }
      pond.push(fn);
    }

    remove(fn) {
      let {pond} = this;
      pond.forEach((item, index) => {
        if (item === fn) {
          pond[index] = null;
        }
      })
    }

    fire(...arg) {
      let {pond} = this;
      for (let i = 0; i < pond.length; i++) {
        let item = pond[i];
        if (item === null) {
          pond.splice(i, 1);
          i--;
          continue;
        }
        item(...arg)
      }
    }
  }

  window.Subscribe = Subscribe;
}();
