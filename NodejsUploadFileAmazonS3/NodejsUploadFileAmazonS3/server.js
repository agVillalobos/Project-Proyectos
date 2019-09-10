const express = require('express');
const app = express();
 
let router = require('./app/routers/upload.router.js');
app.use('/', router);
 
// Create a Server
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})