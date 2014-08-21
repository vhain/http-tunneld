'use strict';

var winston = require('winston');
var net = require('net');
var http = require('http');
var _ = require('lodash');
var url = require('url');

function createServer(opts) {
  var proxy = opts.proxy;

  if (_.isString(proxy))
    proxy = url.parse(proxy);

  var server = net.createServer(function (c) {
    winston.verbose('connection received. requesting proxy server');

    var req = http.request({
      hostname: proxy.hostname,
      port    : proxy.port,
      path    : opts.dest,
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