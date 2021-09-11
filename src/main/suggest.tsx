import React, {useEffect, useState} from "react";

import "./suggest.css"
import {DecadeMultiSelector} from "./selectors/decadeSelector";
import {GeoSelector} from "./selectors/geoSelector";
import {CountryMultiSelector} from "./selectors/countryMultiSelector";
import {IMovie, movieList} from "./filmData";
import {GenreMultiSelector} from "./selectors/genreMultiSelector";
import {MoviePreview} from "./moviePreview";
import {Alert} from "./alert";
import { useHistory } from "react-router-dom";
import {topFunction} from "./utils";

const skipMultipart = (movieSlug: string): boolean => {
    // this should be in the scraper.
    if (movieSlug.indexOf("berlin-alexanderplatz") === 0 &&
        movieSlug !== 'berlin-alexanderplatz-part-1') {
        return true;
    }
    return movieSlug.indexOf("-part-2") > 0 ||
        movieSlug.indexOf("-part-3") > 0 ||
        movieSlug.indexOf("-part-two") > 0 ||
        movieSlug.indexOf("-episode-2") > 0 ||
        movieSlug.indexOf("-episode-3") > 0 ||
        movieSlug.indexOf("-episode-4") > 0 ||
        movieSlug.indexOf("-episode-5") > 0 ||
        movieSlug.indexOf("-episode-6") > 0 ||
        movieSlug.indexOf("-episode-7") > 0 ||
        movieSlug.indexOf("-part-ii") > 0 ||
        movieSlug.indexOf("-part-iii") > 0 ||
        movieSlug.indexOf("-part-iv") > 0;

}

const findRandomMovie = (
    movieList: IMovie[],
    decades: string[],
    countries: string[],
    genres: string[],
    geo: string
): IMovie | null => {

    let selectedMovie: IMovie | null = null;
    let count = 0;
    const decadesInt = decades.map(d => parseInt(d, 10));
    for (let movie of movieList) {
        if (skipMultipart(movie.slug)) {
            continue;
        }
        const movieYear = parseInt(movie.year, 10);

        if (decadesInt.length > 0) {
            if (!decadesInt.map(d => [d, d + 9])
                .some(([from, to]) => movieYear >= from
                    && movieYear <= to
                )) {
                continue;
            }
        }
        if (genres.length > 0) {
            if (genres.filter(value => movie.genre.includes(value)).length === 0) {
                continue;
            }
        }

        if (countries.length > 0 && !countries.includes(movie.country)) {
            continue;
        }
        if (geo && !movie.geo.includes(geo)) {
            continue;
        }
        count += 1;
        if (selectedMovie == null || Math.floor(Math.random() * count) + 1 === count) {
            selectedMovie = movie;
        }
    }
    return selectedMovie;
}




export const Suggest = () => {
    const [suggestedMovie, setSuggestedMovie] = useState<IMovie | null>(null);
    const [decades, setDecades] = useState<string[]>([]);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [geo, setGeo] = useState<string>('US');
    const history = useHistory();

    const changeCountries = (countries: string[]) => {
        setCountries(countries);
    }

    const changeGenres = (genres: string[]) => {
        setGenres(genres);
    }

    const changeDecades = (decades: string[]) => {
        setDecades(decades);
    }

    const selectMovie = () => {
        setHasSelected(true);
        // setSuggestedMovie(findRandomMovie(
        //     movieList, decades, countries, genres, geo));
        const movie = findRandomMovie(
            movieList, decades, countries, genres, geo);
        topFunction();
        if (movie) {
            history.push(`/suggest/${movie.slug}`);
        }
    }

    const onReset = (oldMovie: IMovie) => {
        setHasSelected(false);
        setSuggestedMovie(null);

        (window as any).gtag('event', 'search_reject', {
            'event_category': 'search',
            'movie': oldMovie,
            'slug': oldMovie.slug,
            'transport_type': 'beacon'
        });
    }

    useEffect(
        () => {
            if (suggestedMovie) {
                (window as any).gtag('event', 'search', {
                    'event_category': 'search_result',
                    'event_label': 'Show Movie',
                    'movie': suggestedMovie,
                    'slug': suggestedMovie.slug,
                    'transport_type': 'beacon'
                });
            }
        },
        [suggestedMovie],
    )
    return (
            <div className="suggest">
                {hasSelected && !suggestedMovie &&
                    <Alert message="There are no matches!  You have asked too much of the Goddess!  Beseech again!" />
                }
                <div>
                    <div>
                        <h1>Random Movie Finder</h1>
                        <hr/>
                    </div>
                    {!suggestedMovie &&
					<>
						<p className="lead">Let the Goddess of Fortune, <a
							href="https://greekgodsandgoddesses.net/goddesses/tyche/" rel="noreferrer"
							target="_blank">Tyche</a>,
							assign you a movie from <a href="https://www.criterionchannel.com/" target="_blank"
													   rel="noreferrer">the Criterion Channel</a><sup>*</sup>.</p>
						<form>
							<DecadeMultiSelector
								label="Select Decades &gt;&gt;"
								selectedDecades={decades}
								onChange={changeDecades}
							/>
							<CountryMultiSelector
								label="Select Countries &gt;&gt;"
								selectedCountries={countries}
								onChange={changeCountries}
							/>
							<GenreMultiSelector
								label="Select Genres &gt;&gt;"
								selectedGenres={genres}
								onChange={changeGenres}
							/>
							<GeoSelector
								selectedGeo={geo}
								onChange={setGeo}
							/>
							<button type="button"
									className="dropdown-item"
                                    onClick={selectMovie}>I accept my fate!</button>
						</form>
					</>
                    }
                    {suggestedMovie &&
					<>
						<p className="lead">Tyche, The Goddess of Fortune, has spoken.</p>
						<MoviePreview movie={suggestedMovie} onReset={onReset}/>
					</>
                    }
                </div>


            </div>
    );
}