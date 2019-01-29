import { Once } from "@taystack/js-helpers";


class Counter {
  constructor(from, to, options = {}) {
    this.current = from;
    this.setTarget(to, options);
  }

  get options() {
    return this.__options || {
      increment: 1,
      onDone: false,
    };
  }

  get countingDown() {
    return this.increment < 0;
  }

  get isDone() {
    return this.countingDown ? this.current <= this.to : this.current >= this.to;
  }

  get value() {
    return this.isDone ? this.to : this.current;
  }

  getIncrement(multiplier) {
    return (this.current > this.to ? -1 : 1) * multiplier;
  }

  setTarget(to, opts = {}) {
    this.__options = {
      ...this.options,
      ...opts,
    };
    this.onDone = this.options.onDone ? Once(this.options.onDone) : false;
    this.to = to;
    this.increment = this.getIncrement(this.options.increment);
    return this;
  }

  turn() {
    if (this.isDone) {
      const value = this.value;
      this.onDone && this.onDone(value);
      return value;
    };
    this.current += this.increment;
    const value = this.value;
    return this.value;
  }
}

export default Counter;
