#!/usr/bin/env node

/*
 *  APP:        Mini Stock Exchange
 *  MODULE:     Web Server 
 * 
 *  DEVELOPER:  Oladotun Sobande
 *  CREATED ON: 13th August 2018
 * */

import app from './app';
var debug = require('debug')('miniexchangeapp:server');
var http = require('http');

//Normalize a port into a number, string, or false.
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//Event listener for HTTP server "error" event.
var onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Event listener for HTTP server "listening" event.
const onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
};


//Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || process.env.APP_PORT);
app.set('port', port);

//Create HTTP server.
var server = http.createServer(app);

//Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

