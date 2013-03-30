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

Typical callback style:

```js
getUser('mjackson', function (error, user) {
  // Do something with the user...
});
```

You see this kind of thing in node.js examples all the time:

```js
// Very bad, please don't ever do this!
getUser('mjackson', function (error, user) {
  if (error) throw error;
  // Do something with the user...
});
```

```js
// A bit better, but wordy!
function getNewTweetsFor(username, callback) {
  getUser(username, function (error, user) {
    if (error) {
      callback(error);
    } else {
      getNewTweets(user, callback);
    }
  });
}
```

### The Future: ES6 Generators (3 mins.)

  * First-class coroutines
    * First class means you can pass them around like variables
  * Encapsulate suspended execution context
  * Demonstrate using SpiderMonkey shell
    * Maybe task.js?

** Would be neat to show a good example of some ES6 generator code that is rewritten to use promises in ES5. Could make a nice transition into Promises to help people understand that it's not just about aggregating callbacks. **

Run this in the js shell:

```js
function fib() {
  var i = 0, j = 1;
  while (true) {
    yield i;
    var t = i;
    i = j;
    j += t;
  }
}

var g = fib();
for (var i = 0; i < 12; i++) {
  print(g.next());
}
```

### Promises Reset (2 mins.)

Lots of programmers may have had a bad experience with promises in the past due to various poor implementations (e.g. jQuery.Deferred). They may think they already know what the word means without understanding it fully. We need a way to "reset" what the word means to them.

  * Please forget everything you know about:
    * Promises
    * Futures
    * Deferreds

### What is a Promise? (2 mins.)

  * Specifically, we're talking about Promises/A+
    * https://github.com/promises-aplus/promises-spec
  * An asynchronous primitive
    * You can think of it as an asynchronous var
  * Has a single method, "then"
    * Super small/simple spec is important
    * In contrast to libs like async.js (18 methods just for "flow control")
  * _Parallels synchronous programming paradigms_

### then - onFulfilled/onRejected (2 mins.)

  * Accepts 2 arguments: onFulfilled and onRejected
    * only one of onFulfilled or onRejected will be called, and only once
    * onFulfilled is called with a single value
      * Async equivalent to `return`
    * onRejected is called with a single error
      * Async equivalent to `throw`

### then - 4 basic scenarios going from sync => async (10 mins.)

Example: Basic functional transform

```js
var user = getUser('mjackson');
var name = user.name;
```

```js
getUser('mjackson').then(function (user) {
  return user.name;
});
```

Example: Throwing an error

```js
var user = getUser('mjackson');
if (!user) throw new Error('no user!');
var name = user.name;
```

```js
getUser('mjackson').then(function (user) {
  if (!timeline) throw new Error('no user!');
  return user.name;
});
```

Example: Catching and handling an error

```js
try {
  deliverTweetTo(tweet, 'mjackson');
} catch (error) {
  handleError(error);
}
```

```js
deliverTweetTo(tweet, 'mjackson')
  .then(undefined, handleError);
```

Example: Catching and re-throwing an error

```js
try {
  var user = getUser('mjackson');
} catch (error) {
  throw new Error('There was an error: ' + error.message);
}
```

```js
getUser('mjackson').then(undefined, function (error) {
  throw new Error('There was an error: ' + error.message);
});
```

### then - Chaining operations (5 mins.)

  * Returns a new promise
  * Allows chaining of promises

```js
var user = getUser('mjackson');
var tweets = getNewTweets(user);
updateTimeline(tweets);
```

```js
getUser('mjackson')
  .then(getNewTweets)
  .then(updateTimeline);
```

### then - Error propagation (5 mins.)

  * Automatically propagates errors to callers

Example: What if one of our functions throws?

```js
try {
  var user = getUser('mjackson');
  var tweets = getNewTweets(user);
  updateTimeline(tweets);
} catch (error) {
  handleError(error);
}
```

```js
getUser('mjackson')
  .then(getNewTweets)
  .then(updateTimeline, handleError);
```

### then - Comparison with callbacks (3 mins.)

```js
getUser('mjackson', function (error, user) {
  if (error) {
    handleError(error);
  } else {
    getNewTweets(user, function (error, tweets) {
      if (error) {
        handleError(error);
      } else {
        updateTimeline(tweets, function (error) {
          if (error) handleError(error);
        });
      }
    });
  }
});
```

```js
// Callbacks, complete with timebombs!
getUser('mjackson', function (error, user) {
  if (error) throw error;
  getNewTweets(user, function (error, tweets) {
    if (error) throw error;
    updateTimeline(tweets, function (error) {
      if (error) throw error;
    });
  });
});
```

### Going from Callbacks to Promises

  * require('q').nfbind(fs.stat)
  * require('when/node/function').lift(fs.stat);
  * require('rsvp').denodeify(fs.stat); // uses 2.0.0-rc1

### Asynchronous API Examples (remainder)

Example: Get some info about the first file in an array of possible files that exists on the file system

First, use Q to wrap fs.stat.

```js
var q = require('q');
var fileStat = q.nfbind(require('fs').stat);

function getStat(file) {
  return fileStat(file).then(null, handleStatError);
}

function handleStatError(error) {
  if (error.code === 'ENOENT') return null;
  throw error;
}
```

Then, use Q.all to execute all operations in parallel and get the results.

```js
var possibleFiles = [ 'index.html', 'index.htm' ];
q.all(possibleFiles.map(getStat)).then(function (stats) {
  for (var i = 0, len = stats.length; i < len; ++i) {
    if (stats[i]) {
      return sendFile(possibleFiles[i], stats[i]);
    }
  }

  return notFound();
});
```

This is a piece of work that I actually did in strata: https://github.com/mjijackson/strata/commit/f5c7edfece8fb999017dd792542d0fc226ab8768

Other ideas:

  * Rendering a bunch of partials for a larger template
  * Streaming a multipart upload to disk
  * Others?
