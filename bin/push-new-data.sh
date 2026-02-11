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
if [ -n "$GITHUB_ACTIONS" ]; then
  git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
fi
git add -A .

# Only commit if there are changes
if ! git diff-index --quiet HEAD --; then
  git commit -m "Data Update $DATE_TODAY"
else
  echo "No changes to commit"
fi

# Only tag if the tag doesn't exist
TAG_NAME="v$DATE_TODAY"
if ! git rev-parse "$TAG_NAME" >/dev/null 2>&1; then
  git tag "$TAG_NAME"
else
  echo "Tag $TAG_NAME already exists, skipping."
fi

npm run deploy
git push origin --tags
git push origin master
