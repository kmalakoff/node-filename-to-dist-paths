module.exports = function addVersionAndArch(key, version) {
  const arch = key.split('/')[0];
  const parts = key.split('.');
  return [`${parts[0]}-${version}-${arch}.${parts[1]}`];
};
