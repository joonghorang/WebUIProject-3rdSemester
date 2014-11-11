var http = require("http");
var url = require("url");

function start(route, handle){
    function OnRequest(request, response){
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");
        
        route(handle, pathname);
        
        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("Hello Route world");
        response.end();
    }
    http.createServer(OnRequest).listen(8888);
    console.log("Server has Started.");
}

exports.start = start;