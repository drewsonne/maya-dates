# Changelog

## [1.3.15](https://github.com/drewsonne/maya-dates/compare/v1.3.14...v1.3.15) (2026-09-25)


### Bug Fixes

* restore main to a passing state after three broken dep merges ([#211](https://github.com/drewsonne/maya-dates/issues/211)) ([c49fdd0](https://github.com/drewsonne/maya-dates/commit/c49fdd0c2236ac98f20130eeb6eb4254422b33d2))

## [1.3.14](https://github.com/drewsonne/maya-dates/compare/v1.3.13...v1.3.14) (2026-09-13)


### Licensing

* add missing `LICENSE` file. The package declared GPL-3.0 but shipped no licence text ([#198](https://github.com/drewsonne/maya-dates/pull/198))
* correct the SPDX identifier from the deprecated `GPL-3.0` to `GPL-3.0-only`, its exact non-deprecated equivalent. This preserves the existing grant and does not widen it ([#198](https://github.com/drewsonne/maya-dates/pull/198))

### Documentation

* remove three merge conflict markers that had been rendering verbatim on the npm package page ([#198](https://github.com/drewsonne/maya-dates/pull/198))
* replace the dead ESDoc coverage badge, broken since the `docs/` tree was removed in August 2020, with working CI, npm, docs and license badges ([#198](https://github.com/drewsonne/maya-dates/pull/198))

No functional changes to the library; this release exists to get the above to consumers ([#199](https://github.com/drewsonne/maya-dates/issues/199)) ([b8822e7](https://github.com/drewsonne/maya-dates/commit/b8822e745501547ee21ab11aa657751dbfc98184)).

## [1.3.13](https://github.com/drewsonne/maya-dates/compare/v1.3.12...v1.3.13) (2026-09-13)


### Bug Fixes

* make npm publish work with trusted publishing ([1558bfa](https://github.com/drewsonne/maya-dates/commit/1558bfae17d7f6c3722f3f18e3ccc494c127c5a2))
* remove the last NPM_TOKEN reference by deleting npmpublish.yml ([92e170f](https://github.com/drewsonne/maya-dates/commit/92e170f83e96cc77302bf25f6a76c8c0b15b9770))

## [1.3.12](https://github.com/drewsonne/maya-dates/compare/v1.3.11...v1.3.12) (2026-09-13)


### Bug Fixes

* remove invalid $comment key from release-please config ([b0ec450](https://github.com/drewsonne/maya-dates/commit/b0ec450cfc309ef7cce509161d48880c1c06f13e))
* remove root postinstall that breaks consumer installs ([678326d](https://github.com/drewsonne/maya-dates/commit/678326d844f197beed164ecaacc46b6ebb1c3b22))


### Refactoring

* cleanups ([649b7b6](https://github.com/drewsonne/maya-dates/commit/649b7b63e6eb2045c79e88d91eeb062eccdb8718))
* extract year extraction into helper function ([aeec219](https://github.com/drewsonne/maya-dates/commit/aeec2192d145e0c474d5dcbae5d4499eae3ce140))
