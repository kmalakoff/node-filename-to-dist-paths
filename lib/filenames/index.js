module.exports = [
  { gt: '0.12.18', map: require('./gt-0.12.18.js') },
  { gt: '0.11.9', lte: '0.12.18', map: require('./lte-0.12.18') },
  { gt: '0.7.6', lte: '0.11.9', map: require('./lte-0.11.9') },
  { gt: '0.7.0', lte: '0.7.6', map: require('./lte-0.7.6') },
  { gt: '0.6.13', lte: '0.7.0', map: require('./lte-0.7.0') },
  { gt: '0.6.9', lte: '0.6.13', map: require('./lte-0.6.13') },
  { gt: '0.5.4', lte: '0.6.9', map: require('./lte-0.6.9') },
  { lte: '0.5.4', map: require('./lte-0.5.4') },
];
