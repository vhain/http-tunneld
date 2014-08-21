'use strict';

var winston = require('winston');
var net = require('net');
var http = require('http');
var _ = require('lodash');
var url = require('url');

function createServer(opts) {
  var server = net.createServer(function (c) {
    winston.verbose('connection received. requesting proxy server');

    if (_.isString(opts.proxy))
      opts.proxy = url.parse(opts.proxy);

    var req = http.request({
      hostname: opts.proxy.hostname,
      port    : opts.proxy.port,
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