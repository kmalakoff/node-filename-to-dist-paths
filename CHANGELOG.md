# Changelog

All notable changes to node-filename-to-dist-paths are documented here.

## [1.9.0] - 2026-11-18

### Changed

- Refreshed release lists are written to `~/.node-filename-to-dist-paths/cache/v1/` and shared by every project, instead of the package's own `.cache` folder. This fixes refreshes failing with `EACCES` in root-owned global installs and read-only package folders.
- The copy shipped with the package is only read, and is used whenever it is newer than the home copy.
- A body that is plainly not the release list is no longer stored.

### Added

- `getDists`, `getDist`, `getDistsAsync` and `getDistAsync` take an optional `{ cachePath }`: that folder only is read and written.
- `constants.CACHE_FORMAT` (`'v1'`) and `constants.CACHE_NAME` (`'node-filename-to-dist-paths'`) name the cache format folder and the home dot-folder.

### Notes

- The home folder must be writable to save a refresh. With a read-only or missing home folder, or when a refresh cannot be saved, the functions return the newest stored copy (the shipped one if nothing newer is stored) instead of an error; pass `cachePath` to refresh somewhere else.

## [1.8.3] - 2026-09-06

### Fixed

- `fromFilename('headers', version)` returned the checksum file (`SHASUMS256.txt`) instead of the
  headers tarball. It now returns `node-<version>-headers.tar.gz`, or `.tar.xz` when a `compression`
  specifier of `xz` is passed, matching every other tar-based target.
