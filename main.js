//main.js

//module, lib
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

//create web server(main stream)
var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  //root
  if (pathname === '/') {
    if (queryData.id === undefined) {
      topic.home(request, response);
    }
    else {
      topic.page(request, response);
    }
  }
  //create page
  else if (pathname === '/create') {
    topic.create(request, response);
  }
  //create process
  else if (pathname === '/create_process') {
    topic.create_process(request, response);
  }
  //update page
  else if (pathname === '/update') {
    topic.update(request, response);
  }
  //update process
  else if (pathname === '/update_process') {
    topic.update_process(request, response);
  }
  //delete process(not need delete page)
  else if (pathname === "/delete_process") {
    topic.delete_process(request, response);
  }
  //author page
  else if (pathname === "/author") {
    author.home(request, response);
  }
  //create process for author
  else if (pathname === "/author/create_process") {
    author.create_process(request, response);
  }
  //update page for author
  else if (pathname === "/author/update") {
    author.update(request, response);
  }
  //update process for author
  else if (pathname === "/author/update_process") {
    author.update_process(request, response);
  }
  //delete process for author
  else if (pathname === "/author/delete_process") {
    author.delete_process(request, response);
  }
  //undefined page
  else {
    response.writeHead(404);
    response.end('Not found');
  }
});
//using 3000 port of local
app.listen(3000);