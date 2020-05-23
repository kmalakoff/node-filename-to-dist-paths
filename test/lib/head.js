var url = require('url');
var https = require('https');
var once = require('once');

module.exports = function head(src, callback) {
  callback = once(callback);

  // eslint-disable-next-line node/no-deprecated-api
  var parsed = url.parse(src);
  var req = https.request({ host: parsed.host, path: parsed.path, port: 443, method: 'HEAD' });
  req.on('response', function response(res) {
    callback(null, res);
  });
  req.on('error', callback);
  req.end();
};
