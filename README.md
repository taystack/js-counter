![JsCounter](https://github.com/taystack/js-counter/blob/master/JsCounter.png?raw=true)

[![codecov](https://codecov.io/gh/taystack/js-counter/branch/master/graph/badge.svg)](https://codecov.io/gh/taystack/js-counter)
[![Build Status](https://travis-ci.org/taystack/js-counter.svg?branch=master)](https://travis-ci.org/taystack/js-counter)

---

 - [Installation](#installation)
 - [What is it?](#what-is-it)
 - [Use](#use)
 - [Documentation](#documentation)
   - [Constructor](#constructor)
   - [Attributes](#attributes)
   - [Methods](#methods)

# Installation

```bash
yarn add @taystack/js-counter
```

or

```bash
npm i @taystack/js-counter
```

# What is it?

JsCounter is a step-counter written in JavaScript.

# What is it for?

JsCounter is helpful for finding animation values for pure JavaScript animations. Pure-css transitions can be used to accomplish most any animation task. Sometimes you cannot rely on pure-css to animate things you need.

# Why it was written

During an animation loop, I was given two coordinantes `{x1}`, `{x2}`. I needed `{x1}` to get closer to `{x2}` at a constant rate. Simple css transition, but there was one catch; `{x2}` is constantly moving.

"So, what?" you say? Well, css transitions are picky. Once they invoke, you can change the target value, but the rate of change to get there is a function of how much time is left. Css transformations get weird with dynamic end-values.

# Use

If I wanted to change the `style.position.x` property of a DOM item, then I would use this module to track the position of, say, an animal inside an animation loop:

```javascript
import Counter from "@taystack/js-counter";

class Animal {
  constructor(speed, position = 0) {
    this.speed = speed;
    this.currentPosition = position;
    this.position = new Counter(position, position, {increment: this.speed});
  }

  set target(distance) {
    this.position.setTarget(distance);
  }

  animate() {
    this.currentPosition = this.position.turn();
    this.style.position.x = this.currentPosition;
  }
}
```

I could then create an animation loop tracking the animal's position chasing, say, another `Animal`. How about a dog chasing a cat?

```javascript
const dog = new Animal(5);
const cat = new Animal(6, 10); // more speed, further starting position
cat.target = Infinity; // cat is now targeting Infinity (running away)

(function animateDog() {
  cat.animate();
  dog.target = cat.currentPosition; // dog is targeting the cat's position
  dog.animate():
  setTimeout(() => {
    requestAnimationFrame(animateDog);
  }, FRAMERATE);
})();
```

Now, the `dog` will constantly be "chasing" the `cat` by adjusting it's `target` towards the cat's `currentPosition`.

If you wanted the dog to do something after it caught the cat, you could modify the `set target(distance)` setter method into an instance method that accepts `onDone`. Let's say, `hunt(distance, onDone)`:

```javascript
class Hunter extends Animal {
  ...
  eat(animal) {/* ... */}

  hunt(distance, onDone) {
    this.onDone = onDone;
    this.position.setTarget(distance, { onDone });
  }
  ...
}
```

Now we can actually do something if our `dog` ever catches the `cat`. Let's try a wolf with our new `Hunter` class:

```javascript
const wolf = new Hunter(7);
const cat = new Animal(6);
cat.target = Infinity;

(function animate() {
  cat.animate();
  wolf.hunt(cat.currentPosition, () => { wolf.eat(cat) });
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, FRAMERATE);
})();
```

# Documentation

## Constructor

### `const counter = new Couter(Number from, Number to[, Object options])`

#### Params

   - #### `from (Number)`

     The value that *`counter`* starts at.

   - #### `to (Number)`

     The value that *`counter`* works towards after each call to *`counter.turn()`*.

   - #### `options (Object)` _\<optional>_

      - ##### `increment (Number > 0)`
        The value used to calculate the step size of *`counter.current`* towards *`counter.to`* each time *`counter.turn()`* is called.

        ***Default***: `1`

        ***Note***: This value should always be positive

        ***TODO***: Make this use `Math.abs`

      - ##### `onDone(value) (Function)`
        `Function` to invoke when *`counter`* reaches it's target.

        ***`onDone` params***
        - `value (Number)` - *`counter.value`*

## Attributes

   - #### `counter.value`

     The current value of the counter

## Methods

   - #### `counter.turn()`

	 This will advance *`counter.current`* towards *`counter.to`*

     ***Returns:***  `counter.value`

   - #### `counter.setTarget(Number to[, Number increment=1])`

	 Updates the target value of *`counter`*

     ***Note:*** *Params are the same as constructor [to, increment] params*
