// In a fully synchronous call stack, try/catch give you the ability to catch a
// value that was thrown much further down the stack. The language manages the
// call stack for you and automatically unwinds it when someone throws.

try {
  var user = getUser('mjackson');
  var tweets = getNewTweets(user);
  updateTimeline(tweets);
} catch (error) {
  handleError(error);
}

// Using callbacks we need to manually check for and propagate the error each
// step of the way.

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

// Same example, complete with time bombs!
getUser('mjackson', function (error, user) {
  if (error) throw error;
  getNewTweets(user, function (error, tweets) {
    if (error) throw error;
    updateTimeline(tweets, function (error) {
      if (error) throw error;
    });
  });
});

process.on('uncaughtException', handleError); // LOL

// Promises propagate the error for us in an asynchronous call stack. If the
// promise returned from the call to `getUser` is rejected the error
// automatically propagates to the promise returned from `getUser().then` and
// any other promise that may follow. The first promise with a rejection handler
// serves the same purpose as the `catch` statement in a fully synchronous call
// stack. This gives us try/catch semantics in a fully asynchronous environment.

var q = require('q');

function getUser(name) {
  var value = q.defer();
  value.reject(new Error('no user with name ' + name));
  return value.promise;
}

function getNewTweets(user) {
  console.log('getNewTweets'); // never called
}

function updateTimeline(tweets) {
  console.log('updateTimeline'); // never called
}

function handleError(error) {
  console.error('ERROR: ' + error.message);
}

getUser('mjackson')
  .then(getNewTweets)
  .then(updateTimeline)
  .then(undefined, handleError);
