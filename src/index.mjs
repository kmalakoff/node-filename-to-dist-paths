import find from 'lodash.find';
import match from 'match-semver';

import FILENAMES from './filenames';
import PATHS from './paths';

export default function filenameToDists(filename, version) {
  const filenames = find(FILENAMES, match.bind(null, version));
  const paths = find(PATHS, match.bind(null, version));

  const results = [];
  for (const key in filenames.map) {
    if (filenames.map[key] !== filename) continue;

    const pathsFunction = paths.map[key];
    if (!pathsFunction && ~key.indexOf('.')) {
      results.push(`${version}/${key}`);
    } else {
      const relativePaths = (pathsFunction || paths.map.default)(key, version);
      for (let index = 0; index < relativePaths.length; index++) {
        results.push(`${version}/${relativePaths[index]}`);
      }
    }
  }
  return results;
}
