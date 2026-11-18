# node-filename-to-dist-paths

Converts files from https://nodejs.org/dist/index.json into relative distribution paths for download from https://nodejs.org/dist/.

```bash
npm install node-filename-to-dist-paths
```

```js
import fromFilename from 'node-filename-to-dist-paths';

console.log(fromFilename('win-x64-exe', 'v14.2.0'));
// 'v14.2.0/win-x64/node.exe'

console.log(fromFilename('osx-x64-tar', 'v14.2.0'));
// 'v14.2.0/node-v14.2.0-darwin-x64.tar.gz'

console.log(fromFilename('win-x64-exe', 'v0.6.18'));
// 'v0.6.18/node.exe'

console.log(fromFilename('osx-x64-tar', 'v0.6.18'));
// 'v0.6.18/node-v0.6.18-darwin-x64.tar.gz'

console.log(fromFilename('linux-x64-musl', 'v24.20.0'));
// 'v24.20.0/node-v24.20.0-linux-x64-musl.tar.gz'
```

A third dash-separated segment that isn't one of the known extensions (`tar`, `zip`, `7z`, `msi`, `exe`, `pkg`) is treated as an arch variant rather than the extension, as with the `musl` in `linux-x64-musl` above.

The default export converts a filename key and version to a path. The package also exports `getDist`, `getDistAsync`, `getDists`, and `getDistsAsync` for reading the Node.js distribution index.

## Cache

Refreshed copies of the Node.js release list are kept in `~/.node-filename-to-dist-paths/cache/<format>/` (for example `v1`). The home folder must be writable; to use another folder, pass the `cachePath` option to `getDists`, `getDist`, `getDistsAsync` or `getDistAsync`:

```js
import { getDists, getDistsAsync } from 'node-filename-to-dist-paths';

const cachePath = '/some/folder';
getDists({ cachePath }); // null until getDistsAsync has saved a list there
const dists = await getDistsAsync({ cachePath });
```

With `cachePath`, that folder is the only one read and written. Otherwise the copy shipped with the package is read when it is newer than the home copy, so a fresh offline install still works. The async functions return the newest stored copy, never an error, when a refresh cannot be saved (an unwritable or missing home folder) or the network is unreachable. Nothing here is ever deleted automatically: an older format folder stays after an upgrade until you delete it. Deleting `~/.node-filename-to-dist-paths`, or any folder in it, is always safe: the next run uses the copy shipped with the package and fetches a fresh one.
