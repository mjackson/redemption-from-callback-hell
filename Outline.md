_Work in Progress_

Apologies if this is a bit of a brain dump!

### Why Use Callbacks? (10 mins.)

See examples/callback.js

  * We know how to write synchronous programs that block on IO
  * In order to not block, we need to make functions asynchronous
  * Callbacks are the absolute minimum thing that could work
    * No guarantees
    * Poor flow control, mega-callbacks calling many other callbacks
    * Low level of consistency, especially outside node.js
    * Manual error propagation
  * Callbacks don't scale when building large apps
    * Callback Hell

### The Future: ES6 Generators (3 mins.)

See examples/generator.js

  * First-class coroutines
    * First class means you can pass them around like variables
  * Encapsulate suspended execution context
  * But we're not quite there yet
    * Specified in ES6
    * SpiderMonkey has an experimental implementation

### Promises Reset (2 mins.)

Lots of programmers may have had a bad experience with promises in the past due to various poor implementations (e.g. jQuery.Deferred). They may think they already know what the word means without understanding it fully. We need a way to "reset" what the word means to them.

  * Please forget everything you know about:
    * Promises
    * Futures
    * Deferreds
  * jQuery.Deferred is a broken implementation!

### What is a Promise? (2 mins.)

  * Specifically, we're talking about Promises/A+
    * https://github.com/promises-aplus/promises-spec
  * A first-class asynchronous primitive
    * You can think of it as an asynchronous var
    * Immutable once set
  * Has a single method, "then"
    * Super small/simple spec is important
    * In contrast to libs like async.js (18 methods just for "flow control")
  * _Parallels synchronous programming paradigms_

### then - onFulfilled/onRejected (2 mins.)

Example:

    getUser('mjackson').then(function (user) {
      // ...
    }, function (error) {
      // ...
    });

  * Accepts 2 arguments: onFulfilled and onRejected
    * only one of onFulfilled or onRejected will be called, and only once
    * onFulfilled is called with a single value
      * Async equivalent to `return`
    * onRejected is called with a single error
      * Async equivalent to `throw`

### then - Core sync => async Transforms (7 mins.)

See examples/transforms.js

  * There are 4 core sync => async transforms
    * Simple functional transform
    * Throwing an error
    * Catching and handling an error
    * Catching and re-throwing an error

### then - Chaining (7 mins.)

See examples/sequence.js

  * Sync functions propagate values by simple assignment
  * Callbacks propagate values using callback arguments
  * Promises propagate values using fulfill handlers
    * Allows promises to be chained easily

### then - Handling errors (7 mins.)

See examples/error-handling.js

  * Sync try/catch automatically unwind the call stack
  * Callbacks require manual error propagation
  * Promises automatically propagate errors to callers
    * Gives you try/catch semantics in a fully async environment

### Promises/A+ libraries

  * Q - https://github.com/kriskowal/q
  * when - https://github.com/cujojs/when
  * RSVP - https://github.com/tildeio/rsvp.js

### then - Parallel operations using "all" (5 mins.)

  * Promise libraries usually include an all method for doing stuff in parallel
  * A powerful technique for executing multiple async operations in parallel
  * Aggregates the results

### Going from Callbacks to Promises in node.js using "denodeify" (3 mins.)

  * Promise libraries usually include a method for coercing functions that expect node.js-style callbacks to functions that return a promise instead
    * require('q').denodeify(fs.readFile)
    * require('rsvp').denodeify(fs.readFile) // uses 2.0.0-rc1
    * require('when/node/function').lift(fs.readFile)

### Bonus: Building promise-based HTTP servers in node.js

See examples/http-server.js

  * Fault-tolerant servers
    * The request handler returns a promise
    * All the way down the request handler stack
    * No need for node's "domains"
  * If you're interested, check out mach
    * https://github.com/machjs/mach
