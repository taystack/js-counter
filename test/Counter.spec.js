import { Times } from "@taystack/js-helpers";
import Counter from "../src/Counter";


describe("Counter", () => {
  let turn;
  beforeEach(() => {
    turn = jest.spyOn(Counter.prototype, "turn");
    turn.mockClear();
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

  it("should increment with provided increment", () => {
    const counter1 = new Counter(0, 10, 1);
    expect(counter1.turn()).toEqual(1);
    const counter2 = new Counter(0, 10, 2);
    expect(counter2.turn()).toEqual(2);
  });

  it("should decrement with provided increment", () => {
    const counter3 = new Counter(10, 0);
    expect(counter3.turn()).toEqual(9);
    const counter4 = new Counter(10, 0, 2);
    expect(counter4.turn()).toEqual(8);
  });

  it("should change direction when updating", () => {
    const counter = new Counter(0, 100, 10);
    expect(counter.turn()).toEqual(10);
    counter.setTarget(0, 1);
    expect(counter.turn()).toEqual(9);
    counter.setTarget(1000, 100);
    expect(counter.turn()).toEqual(109);
  });

  it("should only return the target value when reached", () => {
    const counter = new Counter(0, 10, 10);
    Times(10, () => {
      counter.turn();
    });
    expect(counter.value).toEqual(10);
  });
});
