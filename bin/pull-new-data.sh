#!/usr/bin/env bash

set -eo pipefail

SCRAPETERION_VERSION="1.2.1"

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
  echo "writing to $FILMS_BY_GENRE_RAW_US"
  scrapy crawl films_by_genre -a geo=US -O "$FILMS_BY_GENRE_RAW_US"

  echo "writing to $FILMS_BY_GENRE_RAW_CA"
  scrapy crawl films_by_genre -a geo=CA -O "$FILMS_BY_GENRE_RAW_CA"

  cat "$FILMS_BY_GENRE_RAW_US" "$FILMS_BY_GENRE_RAW_CA" > "$FILMS_BY_GENRE_RAW"

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
FILMS_BY_GENRE_RAW_US="$TMPDIR/films_by_genre_raw_US.jl"
FILMS_BY_GENRE_RAW_CA="$TMPDIR/films_by_genre_raw_CA.jl"
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


