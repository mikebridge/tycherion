#!/usr/bin/env bash

set -euxo pipefail

PROJ_HOME=$(realpath "${BASH_SOURCE%/*}/../")

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

DATE_ISO="$(date -u +%Y-%m-%dT%H:%M:%S).000Z"
DATE_TODAY=$(date +%Y-%m-%d)
DATA_HOME="${PROJ_HOME}/src/data"
# FILMS_JSON="${DATA_HOME}/films.json"
FILMS_META_JSON="${DATA_HOME}/filmsMetaData.json"

#echo "$DATE_ISO"
#echo "$DATE_TODAY"
#echo "$FILMS_JSON"

cat <<EOF > $FILMS_META_JSON
{
  "scrapeterion": "1.0.0",
  "date": "$DATE_ISO"
}
EOF

git checkout master
git add -A .
git commit -m "Data Update $DATE_TODAY"
git tag "v$DATE_TODAY"
yarn run deploy
git push origin --tags

