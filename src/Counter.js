class Counter {
  constructor(from, to, increment) {
    this.current = from;
    this.setTarget(to, increment);
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

  setTarget(to, increment = 1) {
    this.to = to;
    this.increment = this.getIncrement(increment);
    return this;
  }

  turn() {
    if (this.isDone) return this.value;
    this.current += this.increment;
    return this.value;
  }
}

export default Counter;
