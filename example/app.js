var http = require('http');
var drex = require('drex');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  drex.require('./helloworld.js', function(helloworld)
  {
    	helloworld.say(res);
  });
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
