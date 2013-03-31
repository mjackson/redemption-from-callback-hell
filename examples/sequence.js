// If all functions are synchronous, we propagate values from one function
// call to the next using simple assignment.

var user = getUser('mjackson');
var tweets = getNewTweets(user);
updateTimeline(tweets);

// We could also write the same thing more tersely.

updateTimeline(getNewTweets(getUser('mjackson')));

// But what if the functions are async?

// Callbacks propagate values from one function to the next using callback
// arguments. Using this method, code shifts rather quickly to the right.

getUser('mjackson', function (user) {
  getNewTweets(user, function (tweets) {
    updateTimeline(tweets);
  });
});

// Promises propagate the value from one operation to subsequent ones using the
// fulfill handler. This works particularly well if you adhere to functional
// programming principles which dictate that functions should produce the same
// result every time they are called with the same arguments and should not have
// side effects.

getUser('mjackson')
  .then(getNewTweets)
  .then(updateTimeline);
