// 라우터 : 요청과 요청을 처리할 핸들러들을 연결. 

function route(handle, pathname, response, postData){
	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function') {
		return handle[pathname](response, postData);
	} else {
		console.log("No request handle found for " + pathname); // 해당 라우터가 없을 때 에러처리. 
		response.writeHead(404, {"Content-Type" : "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route; // route함수를 밖으로 보낸다.

