module.exports = function addExtensionsFn(extensions) {
  return function addExtensions(key, version) {
    const results = [];
    for (let index = 0; index < extensions.length; index++) {
      results.push([`node-${version}-${key}${extensions[index]}`]);
    }
    return results;
  };
};
