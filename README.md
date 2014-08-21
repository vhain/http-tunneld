# http-tunneld

nodejs global program to utilize http tunnel

## use as node_module
install
```
npm install http-tunneld --save
```

code below creates tcp server listening from 3128
which will pipe data through proxy to dest.

```javascript
var tunnel = require('http-tunneld')({
  proxy: 'http://proxy.intranet:3218',
  dest: 'http://target.internet'
});
tunnel.listen(3128);
```

## use as global
install
```
[sudo] npm install http-tunneld -g
```

run

```
tunnel --verbose --proxy http://proxy.intranet:3128 --port 3128 --dest http://target.internet
```

you might consider running http-tunneld using [pm2](https://github.com/Unitech/pm2) to daemonize.

## note
this module is tested under [squid](http://www.squid-cache.org/).