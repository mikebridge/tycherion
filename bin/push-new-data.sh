#!/usr/bin/env bash

set -euxo pipefail

#PROJ_HOME=$(realpath "${BASH_SOURCE%/*}/../")
DATE_TODAY=$(date +%Y-%m-%d)

#while [ "$#" -gt 0 ]; do
#  case "$1" in
#    -v) VERSION="$2"; shift 2;;
#
#    --version=*) VERSION="${1#*=}"; shift 1;;
#    --version) echo "$1 requires an argument" >&2; exit 1;;
#
#    -*) echo "unknown option: $1" >&2; exit 1;;
#    #*) handle_argument "$1"; shift 1;;
#  esac
#done
#
#if [[ ! -v VERSION ]];
#then
#  echo "missing -v <VERSION>"
#  exit 1
#fi

#
# apply the changes to films.json, which
# was created by
#
# scrapy crawl films -O src/data/films.json
#


git checkout master
git add -A .
git commit -m "Data Update $DATE_TODAY"
git tag "v$DATE_TODAY"
yarn run deploy
git push origin --tags

