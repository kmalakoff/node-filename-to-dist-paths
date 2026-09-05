## node-filename-to-dist-paths

Converts files from https://nodejs.org/dist/index.json into relative distribution paths for download from https://nodejs.org/dist/.

```
var fromFilename = require('node-filename-to-dist-paths');

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
