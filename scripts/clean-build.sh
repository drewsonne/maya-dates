#! /usr/bin/env bash
set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "${DIR}" || exit
cd ..

find ./src \
  \( -name "*.js" -o -name "*.d.ts.map" -o -name "*.d.ts" -o -name "*.js.map" \) \
  -delete
