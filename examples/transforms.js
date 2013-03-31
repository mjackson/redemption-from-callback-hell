// These examples demonstrate 4 basic transforms from sync to async functions
// using promises.

// Basic functional transform

var user = getUser('mjackson');
var name = user.name;

getUser('mjackson').then(function (user) {
  return user.name;
});

// Throwing an error

var user = getUser('mjackson');
if (!user) throw new Error('no user!');
var name = user.name;

getUser('mjackson').then(function (user) {
  if (!timeline) throw new Error('no user!');
  return user.name;
});

// Catching and handling an error

try {
  deliverTweetTo(tweet, 'mjackson');
} catch (error) {
  handleError(error);
}

deliverTweetTo(tweet, 'mjackson')
  .then(undefined, handleError);

// Catching and re-throwing an error

try {
  var user = getUser('mjackson');
} catch (error) {
  throw new Error('There was an error: ' + error.message);
}

getUser('mjackson').then(undefined, function (error) {
  throw new Error('There was an error: ' + error.message);
});
