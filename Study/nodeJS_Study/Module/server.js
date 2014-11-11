var http = require("http");

function start(){
    function OnRequest(request, response){
        console.log("Request received.");
        response.writeHead(200, { "Content-Type" : "text/plain" });
        response.write("Hello Module World!");
        response.end();
    }
    http.createServer(OnRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;