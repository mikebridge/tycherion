import {Button, Container, Jumbotron, Media} from "reactstrap";
import React, {useEffect, useState} from "react";
import {timeAgoInWords, withDateStringsAsDates} from "./utils";

interface IMovie {
    title: string,
    url: string,
    img: string,
    country: string,
    year: string,
    director: string,
    slug: string
}

interface IMovieMetaData {
    date: Date,
    scrapeterion: string
}

const movieList: IMovie[] = require('../data/films.json');

const metaDataPreDate: any = require('../data/filmsMetaData.json');

const metaData: IMovieMetaData = withDateStringsAsDates(metaDataPreDate);

const cropImgUrl = (imgUrl: string): string => {
    // original url:
    // https://vhx.imgix.net/criterionchannelchartersu/assets/bff62486-e5e9-4e8d-ad75-436cb2cf12c9.jpg
    // append this:
    // ?auto=format%2Ccompress&fit=crop,left&h=140&q=100&w=100&crop=left
    const width=200;
    const height=280;
    return `${imgUrl}?auto=format%2Ccompress&fit=crop,left&h=${height}&q=100&w=${width}&crop=left`
}

const findRandomMovie = (movieList: IMovie[]): IMovie => {
    let selectedMovie: IMovie = movieList[0];
    let count = 0;
    for (let movie of movieList) {
        count += 1;
        if (Math.floor(Math.random() * count) + 1 === count) {
            selectedMovie = movie;
        }
    }
    return selectedMovie;
}

interface IMoviePreviewProps {
    movie: IMovie;
    onReset: (oldMovie: IMovie) => void;
}

export const MoviePreview = ({movie, onReset}: IMoviePreviewProps) => {
    const resetMovie = () => {
        onReset(movie);
    }
    const goToMovie = () => {
        const timeoutId = setTimeout(
            () => {(window as any).location.assign(movie.url);},
            1000);
        (window as any).gtag('event', 'search_success', {
            'event_category': 'search',
            'movie': movie,
            'slug': movie.slug,
            'transport_type': 'beacon',
            'event_callback': () => {
                clearTimeout(timeoutId);
                (window as any).location.assign(movie.url);
            }
        });
        // (window as any).gtag('event', 'click', {
        //     'event_category': 'outbound',
        //     'event_label': movie.slug,
        //     'transport_type': 'beacon',
        //     'event_callback': () => {
        //         clearTimeout(timeoutId);
        //         (window as any).location.assign(movie.url);
        //     }
        // });
    };
    return (
        <Media className="bg-light border rounded">
            <Media left href="#" onClick={goToMovie}>
                <Media object style={{"width":200, "height": 280}} src={cropImgUrl(movie.img)} alt={movie.title} />
            </Media>
            <Media body className="align-items-center">
                <Container className="mt-4">
                    <Media heading>
                        {movie.title}
                    </Media>
                    <div>
                        <div className="font-weight-bold">{movie.director}</div>
                        <div className="font-italic">{movie.country} ({movie.year})</div>
                    </div>
                    <div className="mt-4">
                    <Button color="primary" onClick={goToMovie}>View on Criterion</Button>
                    <Button color="danger" onClick={resetMovie}>I've already seen it</Button>
                    </div>
                </Container>
            </Media>
        </Media>
    )
}

export const MovieSelector = () => {
    const [suggestedMovie, setSuggestedMovie] = useState<IMovie | null>(null);

    const selectMovie = () => {
        setSuggestedMovie(findRandomMovie(movieList));
    }

    const onReset = (oldMovie: IMovie) => {
        setSuggestedMovie(findRandomMovie(movieList));
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
            <>
            <div>
                &nbsp;
            </div>
            <Container className="mt-5">
                <Jumbotron className={"p-4"}>
                    <h1 className="display-6">Random Movie Selector</h1>
                    <hr className="my-2"/>
                    {!suggestedMovie &&
                        <>
                            <p className="lead">Let the Goddess of Fortune, <a href="https://greekgodsandgoddesses.net/goddesses/tyche/" rel="noreferrer" target="_blank">Tyche</a>,
                                assign you a movie on Criterion Channel.</p>
                            {/*<p className="font-italic">O Goddess Tyche</p>*/}
                            <p className="lead">
                                <Button color="primary" onClick={selectMovie}>I accept my fate</Button>
                            </p>
                        </>
                    }
                    {suggestedMovie &&
                        <p>
                            <p className="lead">Tyche, The Goddess of Fortune, has spoken.</p>
                            <MoviePreview movie={suggestedMovie} onReset={onReset}/>
                        </p>
                    }
                </Jumbotron>

                <footer className="footer">
                    <div className="container">
                        <div>Last updated:&nbsp;
                            <span className="font-weight-bold">{timeAgoInWords(metaData.date)}
                            </span>
                        </div>
                        <hr/>
                        <div className="text-muted">Powered by <a href="https://github.com/mikebridge/scrapeterion" rel="noreferrer" target="_blank">scrapeterion {metaData.scrapeterion}</a>.</div>
                        <div className="text-muted font-italic">This site is not affiliated with Criterion.</div>
                    </div>

                </footer>
            </Container>
            </>
    );
}