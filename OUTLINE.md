_Work in Progress_

Apologies if this is a bit of a brain dump!

### Why (2 mins.)

  * Most asynchronous JavaScript APIs suck

### Welcome to Callback Hell (10 mins.)

A callback is a function that essentially disables the two most important abilities of functions: return and throw.

  * No return
    * A callback is called *for* you
    * Nobody is there to get your return value
  * No throw
    * Well, you can but you'll crash your program
    * You need to manually propagate thrown values up the stack
  * No way out
    * All logic happens in one of two places:
      * Within the callback or
      * Within a function that you call from within the callback
    * Code indents quickly to the right
  * Little consistency between implementations

### The Future: ES6 Generators (3 mins. with an example)

  * First-class coroutines
    * First class means you can pass them around like variables
  * Encapsulate suspended execution context
  * Demonstrate using SpiderMonkey shell
    * Maybe task.js?

** Would be neat to show a good example of some ES6 generator code that is rewritten to use promises in ES5. Could make a nice transition into Promises to help people understand that it's not just about aggregating callbacks. **

### Promises (2 mins.)

Lots of programmers may have had a bad experience with promises in the past due to various poor implementations (e.g. jQuery.Deferred). They may think they already know what the word means without understanding it fully. We need a way to "reset" what the word means to them.

  * Please forget everything you know about:
    * Promises
    * Futures
    * Deferreds

### What is a Promise? (2 mins.)

  * Specifically, we're talking about Promises/A+
  * An asynchronous primitive
    * You can think of it as an asynchronous var
  * Has a single method, "then"
    * Super simple spec is important
    * In contrast to libs like async.js (18 methods just for "flow control")
  * Parallels synchronous programming paradigms

### then - onFulfilled/onRejected (5 mins. with examples)

  * Accepts 2 arguments: onFulfilled and onRejected
    * only one of onFulfilled or onRejected will be called, and only once
    * onFulfilled is called with a single value
      * Async equivalent to `return`
    * onRejected is called with a single error
      * Async equivalent to `throw`

### then - chaining (5 mins. with examples)

  * Returns a new promise
    * Allows chaining of promises

### Asynchronous API Examples (remainder)

  * Finding the first file in an array of possible file names that exists on a file system
  * Rendering a bunch of partials for a larger template
  * Streaming a multipart upload to disk
  * Others?

