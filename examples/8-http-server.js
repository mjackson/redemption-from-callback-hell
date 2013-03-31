var http = require('http');
var q = require('q');

var server = http.createServer(function (req, res) {
  handleRequest(req).then(function (response) {
    res.writeHead(response.status, response.headers);
    res.end(response.content);
  }, function (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });
});

server.listen(3000);

function handleRequest(req) {
  var value = q.defer();

  // simulate io
  setTimeout(function () {
    value.resolve({
      status: 200,
      headers: { 'Content-Type': 'text/html' },
      content: '<p>Hello world!</p>'
    });

    // Simulate an error from somewhere down
    // the call stack. The server won't crash.
    //value.reject(new Error('boom!'));
  });

  return value.promise;
}
