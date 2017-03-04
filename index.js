var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 9909;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query

  //从这里开始看，上面不要看
	
	console.log(path);
	switch(path){
            case "/main.css":
		fs.readFile("main.css", 'utf-8',function (err, data) {
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": "text/css"
                    });
                    response.write(data);
                    response.end();
                });
                break;
            case "/main.js":
                fs.readFile("main.js", 'utf-8',function (err, data) {
		    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type":"application/javascript",
                    });
                    response.write(data);
                    response.end();
                });
                break;
            default:
                fs.readFile('index.html', 'utf-8',function (err, data) {
                    if (err) throw err;
                    response.writeHead(200, {
                        "Content-Type": "text/html"
                    });
                    response.write(data);
                    response.end();
                });
 
        }




  // 代码结束，下面不要看
})

server.listen(port)
console.log('监听 9909 成功')

