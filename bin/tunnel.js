var net = require('net');
var url = require('url');
var http = require('http');
var winston = require('winston');

var opts = require('nomnom')
  .option('verbose', {
    abbr: 'v',
    flag: true
  })
  .option('proxy', {
    abbr    : 'x',
    help    : 'HTTP proxy address. Defaults to env $http_proxy (eg. http://proxy.intranet:3212)',
    required: true,
    default : process.env.http_proxy
  })
  .option('port', {
    abbr    : 'p',
    required: true,
    help    : 'Listening port for tunneling server'
  })
  .option('destination', {
    abbr    : 'd',
    required: true,
    help    : 'Final destination to connect through tunnel (eg. target.internet:3211)'
  })
  .parse();

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level    : opts.verbose ? 'verbose' : 'info',
  colorize : true,
  timestamp: function () {
    return new Date().toString();
  }
});

var listen_port = opts.port;
var proxy_opt = url.parse(opts.proxy);
var host = opts.destination;

var server = require('../index')({
  proxy: {
    hostname: proxy_opt.hostname,
    port: proxy_opt.port
  },
  destination: opts.destination
});

server.listen(listen_port);
winston.info('http tunneling server to %s through %s listening from %d', host, http_proxy, listen_port);