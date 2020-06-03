var http = require('http');
var https = require('https');
var url = require('url');
var eos = require('end-of-stream');

module.exports = function fetch(endpoint, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  options = options || {};

  var method = options.method || 'GET';
  // eslint-disable-next-line node/no-deprecated-api
  var parsed = url.parse(endpoint);
  var req =
    parsed.protocol === 'https:'
      ? https.request({ host: parsed.host, path: parsed.path, port: 443, method: method, highWaterMark: options.highWaterMark })
      : http.request({ host: parsed.host, path: parsed.path, port: 80, method: method, highWaterMark: options.highWaterMark });

  console.log(1, { host: parsed.host, path: parsed.path, port: 443, method: method, highWaterMark: options.highWaterMark });

  req.on('response', function response(res) {
    console.log(2, res.statusCode);

    // Follow 3xx redirects
    if (res.statusCode >= 300 && res.statusCode < 400 && 'location' in res.headers) {
      console.log(3, res.statusCode);
      res.resume(); // Discard response
      return fetch(res.headers.location, callback);
    }

    // Only process if successful
    else if (res.statusCode < 200 || res.statusCode >= 300) {
      console.log(4, res.statusCode);
      res.resume(); // Discard response
      return callback(new Error('Response code ' + res.statusCode + ' (' + http.STATUS_CODES[res.statusCode] + ')'));
    }

    // HEAD
    if (method === 'HEAD') {
      console.log(4, res.statusCode);
      res.resume(); // Discard response
      return callback(null, res);
    }

    console.log(5, res.statusCode);

    // GET
    var data = '';
    res.on('data', function (chunk) {
      data += chunk.toString();
    });
    eos(res, function (err) {
      err ? callback(err) : callback(null, { headers: res.headers, body: JSON.parse(data) });
    });
  });
  req.on('error', callback);
  req.end();
};
