# Changelog

All notable changes to node-filename-to-dist-paths are documented here.

## [1.8.3] - 2026-09-06

### Fixed

- `fromFilename('headers', version)` returned the checksum file (`SHASUMS256.txt`) instead of the
  headers tarball. It now returns `node-<version>-headers.tar.gz`, or `.tar.xz` when a `compression`
  specifier of `xz` is passed, matching every other tar-based target.
