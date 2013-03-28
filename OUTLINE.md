_Work in Progress_

Apologies if this is a bit of a brain dump. Lots of this is stuff I wouldn't actually put on a slide, but just my own thoughts on the topic.

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
    * Code shifts quickly to the right
  * Little consistency between implementations

### The Future: ES6 Generators (10 mins. with examples)

  * First-class coroutines
    * First class means you can pass them around like variables
  * Encapsulate suspended execution context

### Promises

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

### What a Promise Isn't

  * Callback aggregation
  * 

### Asynchronous API design

### Callbacks as a poor replacement for return/throw (10 mins.)

  * Functions can do 2 things: return and throw
  * Can't do either from within a callback
  * Callbacks (node-style) are the bare minimum replacement
  * Caveats:
    * No guarantees or consistency between implementations
    * APIs for handling callbacks can get very large, hard to remember
    * Errors don't unwind the stack, require manual propagation
    * Everything needs to be done in the callback, code quickly shifts to the right

### 

  
