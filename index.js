'use strict';

var winston = require('winston');
var net = require('net');
var http = require('http');

function createServer(opts) {
  var server = net.createServer(function (c) {
    winston.verbose('connection received. requesting proxy server');

    var req = http.request({
      hostname: opts.proxy.hostname,
      port    : opts.proxy.port,
      path    : opts.destination,
      method  : 'CONNECT'
    });

    req.on('connect', function (res, socket, head) {
      winston.verbose('connected to proxy. piping')
      c.pipe(socket);
      socket.pipe(c);
    });

    req.on('error', function (e) {
      winston.error('error occured', e.stack, e);
    });

    req.end();
  });

  return server;
}

module.exports = createServer;