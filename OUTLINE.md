### Why (2 mins.)

  * Most asynchronous JavaScript APIs suck

### Welcome to Callback Hell (10 mins.)

A callback is a function that essentially disables the two most important properties of functions: return and throw.

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

  * Please forget everything you know about:
    * Promises
    * Futures
    * Deferreds
  * 
### What is a Promise? (5 mins.)

  * Specifically, we're talking about Promises/A+
  * An asynchronous primitive
    * You can think of it as an asynchronous var
  * Has a single method, "then"
    * Super simple spec is important
    * In contrast to so-called "flow control" libraries with massive APIs
  * Parallels synchronous programming paradigms

### then

  * Accepts 2 arguments: onFulfilled and onRejected
    * only one of onFulfilled or onRejected will be called, and only once
    * onFulfilled is called with a single value
      * Async equivalent to `return`
    * onRejected is called with a single error
      * Async equivalent to `throw`
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

  
