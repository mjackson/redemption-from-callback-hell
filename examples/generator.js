// A generator (specified in ES6) is a way for a function to temporarily
// suspend the execution context. This will be very useful for async
// programming, but we're not quite there yet.

function fibonacci() {
  var i = 0, j = 1;
  while (true) {
    yield i; // <- awesome
    var t = i;
    i = j;
    j += t;
  }
}

var generator = fibonacci();
for (var i = 0; i < 12; i++) {
  print(generator.next());
}
