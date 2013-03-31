// In this first example, assume the query function is synchronous, i.e. it
// executes a call to the database and doesn't return until it has the result.
// If the query function throws, getUser doesn't make any attempt to catch so
// the call stack unwinds automatically until someone catches the error.

function getUser(name) {
  var sql = 'SELECT * FROM users WHERE name=?';
  var user = query(sql, name); // <- blocking
  if (!user) throw new Error('no user!');
  return user;
}

// This second example assumes that the query function is asynchronous. It
// issues a call to the database and registers a callback function to be called
// with the result when IO is finished. If the query operation fails, the
// callback receives the error as its first argument. This is a common pattern
// in node.js.
//
// It is important to notice when contrasting this example with the one above
// that the callback is not able to return or throw since neither statement is
// effective within a callback. Instead, the only thing you can do in a callback
// function is call some other callback (a side effect).

function getUser(name, callback) {
  var sql = 'SELECT * FROM users WHERE name=?';
  query(sql, name, function (error, user) {
    if (error) {
      callback(error);
    } else if (!user) {
      callback(new Error('no user!'));
    } else {
      callback(null, user);
    }
  });
}

// The core node docs and many library authors often use the pattern below when
// documenting their code. The throw statement is particularly dangerous because
// it will crash the entire program. This may be a fine solution for small
// scripts, but it's a poor solution for servers with high availability/uptime
// requirements.

function getUser(name, callback) {
  var sql = 'SELECT * FROM users WHERE name=?';
  query(sql, name, function (error, user) {
    if (error) throw error;
    // ...
  });
}

// When you start chaining async operations using callbacks, you quickly descend
// into a state commonly referred to as "callback hell".

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
