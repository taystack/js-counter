import { Times } from "@taystack/js-helpers";
import Counter from "../src";


describe("Counter", () => {
  let turn;
  beforeEach(() => {
    turn = jest.spyOn(Counter.prototype, "turn");
    turn.mockClear();
  });

  it("should be defined", () => {
    const counter = new Counter(0, 0);
    expect(counter.increment).toEqual(1);
    expect(counter.current).toEqual(0);
    expect(counter.to).toEqual(0);
    expect(counter.isDone).toEqual(true);
  });


  it("should count up to a number with turn()", () => {
    const counter = new Counter(0, 10);
    while (!counter.isDone) { counter.turn(); }
    expect(turn).toHaveBeenCalledTimes(10);
    expect(counter.value).toEqual(10);
  });

  it("should count up to 0 with turn()", () => {
    const counter = new Counter(-10, 0);
    while (!counter.isDone) { counter.turn(); }
    expect(turn).toHaveBeenCalledTimes(10);
    expect(counter.value).toEqual(0);
  });

  it("should count down to 0 with turn()", () => {
    const counter = new Counter(10, 0);
    while (!counter.isDone) { counter.turn(); }
    expect(turn).toHaveBeenCalledTimes(10);
    expect(counter.value).toEqual(0);
  });

  it("should increment with provided increment", () => {
    const counter1 = new Counter(0, 10, {increment: 1});
    expect(counter1.turn()).toEqual(1);
    const counter2 = new Counter(0, 10, {increment: 2});
    expect(counter2.turn()).toEqual(2);
  });

  it("should decrement with provided increment", () => {
    const counter3 = new Counter(10, 0);
    expect(counter3.turn()).toEqual(9);
    const counter4 = new Counter(10, 0, {increment: 2});
    expect(counter4.turn()).toEqual(8);
  });

  it("should change direction when updating", () => {
    const counter = new Counter(0, 100, {increment: 10});
    expect(counter.turn()).toEqual(10);
    counter.setTarget(0, {increment: 1});
    expect(counter.turn()).toEqual(9);
    counter.setTarget(1000, {increment: 100});
    expect(counter.turn()).toEqual(109);
  });

  it("should only return the target value when reached", () => {
    const counter = new Counter(0, 10, {increment: 10});
    Times(20, () => { counter.turn(); });
    expect(counter.value).toEqual(10);
  });

  it("should allow the target to be adjusted", () => {
    const counter = new Counter(0, 10);
    Times(20, () => { counter.turn(); });
    expect(counter.value).toEqual(10);
    counter.setTarget(100);
    Times(20, () => { counter.turn() });
    expect(counter.value).toEqual(30);
  });

  it("should allow for a callback function", () => {
    const onDone = jest.fn();
    const counter = new Counter(0, 5, { onDone });
    Times(10, () => { counter.turn(); });
    expect(onDone).toHaveBeenCalledWith(5);
  });
});
