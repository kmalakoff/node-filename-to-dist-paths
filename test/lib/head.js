var https = require('https');
var url = require('url');

module.exports = function head(src, callback) {
  // eslint-disable-next-line node/no-deprecated-api
  var parsed = url.parse(src);
  var req = https.request({ host: parsed.host, path: parsed.path, port: 443 });

  req.on('response', function response(res) {
    res.resume(); // Discard response
    callback(null, res);
  });
  req.on('error', callback);
  req.end();
};
