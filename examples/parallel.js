// In synchronous code we don't really do things in parallel, but we can make
// an aggregator function.

function getNewTweetsForUsers(users) {
  return users.map(getNewTweets);
}

// In asynchronous code that uses callbacks we always need at least two things:
// things: 1) an accumulator to hold all the results and 2) a flag that keeps
// track of whether we've already called the callback.

function getNewTweetsForUsers(users, callback) {
  var callbackWasCalled = false;
  var allTweets = [];

  users.forEach(function (user) {
    getNewTweets(user, function (error, tweets) {
      if (callbackWasCalled) return;
      if (error) {
        callback(error);
        callbackWasCalled = true;
      } else {
        allTweets.push(tweets);
        if (allTweets.length === users.length) {
          callback(null, allTweets);
          callbackWasCalled = true;
        }
      }
    });
  });
}

// The same pattern using promises eliminates the need for the flag because once
// a promise is resolved any further fulfillment/rejection is a no-op.

var q = require('q');

function getNewTweetsForUsers(users) {
  var value = q.defer();
  var allTweets = [];

  users.forEach(function (user) {
    getNewTweets(user).then(function (tweets) {
      allTweets.push(tweets);
      if (allTweets.length === users.length) {
        value.resolve(allTweets);
      }
    }, value.reject);
  });

  return value.promise;
}

// This is such a common pattern that most promise libraries wrap the behavior
// in a method called "all". Q, when, and RSVP all have such a method.

var q = require('q');

function getNewTweetsForUsers(users) {
  var promises = users.map(getNewTweets);
  return q.all(promises);
}
