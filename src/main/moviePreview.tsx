import {IMovie} from "./filmData";
import React from "react";
// import "./moviePreview.css";

const cropImgUrl = (imgUrl: string): string => {
    // original url:
    // https://vhx.imgix.net/criterionchannelchartersu/assets/bff62486-e5e9-4e8d-ad75-436cb2cf12c9.jpg
    // append this:
    // ?auto=format%2Ccompress&fit=crop,left&h=140&q=100&w=100&crop=left
    const width = 200;
    const height = 280;
    return `${imgUrl}?auto=format%2Ccompress&fit=crop,left&h=${height}&q=100&w=${width}&crop=left`
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
        const url = `${movie.url}?utm_source=tycherion`;
        const timeoutId = setTimeout(
            () => {
                (window as any).location.assign(url);
            },
            1000);
        (window as any).gtag('event', 'search_success', {
            'event_category': 'search',
            'movie': movie,
            'slug': movie.slug,
            'transport_type': 'beacon',
            'event_callback': () => {
                clearTimeout(timeoutId);
                (window as any).location.assign(url);
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
        <>
        <div className="movie-result">
            <div>
                <img className="movie-result-img" src={cropImgUrl(movie.img)} alt={movie.title}/>
            </div>
            <div>
                <div className="movie-result-title">
                    {movie.title}
                </div>
                <div>
                    <div className="movie-result-director">{movie.director}</div>
                    <div className="movie-result-country">{movie.country} ({movie.year})</div>
                </div>
                <div>
                    {movie.genre.map((genre) =>
                        <div className="movie-result-genre" key={genre}>{genre}</div>
                    )}
                </div>
            </div>
        </div>
            <div className="movie-result-buttons">
                <button className="button" onClick={goToMovie}>View on Criterion</button>
                <button className="button button-error" onClick={resetMovie}>I've already seen it</button>
            </div>
            </>
    )
}