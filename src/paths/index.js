module.exports = [
  { gte: '19.9.0', map: require('./gte-19.9.0') },
  { gte: '0.12.18', map: require('./gte-0.12.18') },
  { lt: '0.12.18', map: require('./lt-0.12.18') },
];
