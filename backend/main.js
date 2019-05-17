var http = require('http');
var fs = require('fs');

var requestHandler = function(request, response) {
    fs.readFile(request.url.slice(1), function(err, data) {
        if (err != null) {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write(JSON.stringify(err));
            response.end();
        } else {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        }
    });
};

http.createServer(requestHandler).listen(80); 