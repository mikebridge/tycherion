#!/usr/bin/env bash

set -eo pipefail

SCRAPETERION_VERSION="1.1.0"

verify_env () {
  if [ -z "$SCRAPETERION_VENV" ]; then
    echo "SCRAPETERION_VENV is undefined."
    echo "It needs to point to scrapeterion's python venv activation script"
    exit 1
  fi

  if [ -z "$SCRAPETERION_HOME" ]; then
    echo "SCRAPETERION_HOME is undefined."
    echo "It needs to point to the scrapeterion source"
    exit 1
  fi
}

update_site_meta() {
  FILMS_META_JSON="${DATA_HOME}/filmsMetaData.json"
  DATE_ISO="$(date -u +%Y-%m-%dT%H:%M:%S).000Z"

  echo "== updating site metadata =="

  # FILMS_JSON="${DATA_HOME}/films.json"
  #echo "$DATE_ISO"
  #echo "$DATE_TODAY"
  #echo "$FILMS_JSON"
  cat <<EOF > "$FILMS_META_JSON"
{
  "scrapeterion": "$SCRAPETERION_VERSION",
  "date": "$DATE_ISO"
}
EOF
}

refresh_film_data() {
  echo "== refreshing films from criterion =="

  # find the genres, then query by each genre
  scrapy crawl films_by_genre -O "$FILMS_BY_GENRE"

  # merge the data
  echo "== writing data to $DATA_HOME/films.json =="
  ./merge_genres.py -f "$FILMS_BY_GENRE_RAW" > "$FILMS_BY_GENRE"
}

extract_summaries() {
  echo "== extracting summaries =="
  ./summarize.py -f "$FILMS_BY_GENRE" > "$SUMMARY"
}

extract_genres() {
  echo "== storing genre slugs =="
  scrapy crawl genres -O "$GENRES"
}

# Directories
PROJ_HOME=$(realpath "${BASH_SOURCE%/*}/../")
DATA_HOME="$PROJ_HOME/src/data"
TMPDIR="$PROJ_HOME/tmp"

# Files
FILMS_BY_GENRE="$DATA_HOME/films.json"
SUMMARY="$DATA_HOME/summary.json"
GENRES="$DATA_HOME/genres.json"
FILMS_BY_GENRE_RAW="$TMPDIR/films_by_genre_raw.jl"
mkdir -p "$TMPDIR"


cd "$SCRAPETERION_HOME" || exit
# shellcheck disable=SC1090
. "$SCRAPETERION_VENV"

verify_env
refresh_film_data
extract_summaries
extract_genres
update_site_meta


