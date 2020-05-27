var http = require('http');
var https = require('https');
var url = require('url');
var eos = require('end-of-stream');

module.exports = function fetch(src, callback) {
  // eslint-disable-next-line node/no-deprecated-api
  var parsed = url.parse(src);
  var req = https.request({ host: parsed.host, path: parsed.path, port: 443 });

  req.on('response', function response(res) {
    if (res.statusCode !== 200) {
      res.resume(); // Discard response
      return callback(new Error('Response code ' + res.statusCode + ' (' + http.STATUS_CODES[res.statusCode] + ')'));
    }
    var string = '';
    res.on('data', function data(chunk) {
      string += chunk.toString();
    });
    eos(res, function (err) {
      err ? callback(err) : callback(null, { body: JSON.parse(string) });
    });
  });
  req.on('error', callback);
  req.end();
};
