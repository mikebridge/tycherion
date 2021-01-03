import {Button, Container, Jumbotron, Media} from "reactstrap";
import React, {useState} from "react";
//import ReactGA from 'react-ga';

interface IMovie {
    title: string,
    url: string,
    img: string,
    country: string,
    year: string
}

const movieList: IMovie[] = require('../data/films.json');

// interface MetaData {
//
// }
//
// const metaData: MetaData = require('../data/filmsMetaData.json');

const cropImgUrl = (origUrl: string): string => {
    // https://vhx.imgix.net/criterionchannelchartersu/assets/bff62486-e5e9-4e8d-ad75-436cb2cf12c9.jpg?auto=format%2Ccompress&fit=crop,left&h=140&q=100&w=100&crop=left
    const newUrl = origUrl.replace(/w=[0-9]+/, 'w=100');
    return `${newUrl}&crop=left`
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

    // this should be a hook side-effect
    // ReactGA.event({
    //     category: "Movie",
    //     action: "Assigned Movie",
    //     label: "title",
    //     dimension1: selectedMovie.title
    // });
    return selectedMovie;
}

interface IMoviePreviewProps {
    movie: IMovie;
}

export const MoviePreview = ({movie}: IMoviePreviewProps) => {
    const goToMovie = () => {
        // ReactGA.outboundLink({
        //     label: movie.url,
        // }, () => {
            (window as any).location.href=movie.url;
            //console.log('event sent', movie.url);
        //});

    };
    return (
        <Media className="bg-light border">
            <Media left href="#">
                <Media object src={cropImgUrl(movie.img)} alt={movie.title} />
            </Media>
            <Media body>
                <Container className="mt-1">
                    <Media heading>
                        {movie.title}
                    </Media>
                    <Media>
                        <p className="font-italic">{movie.country} ({movie.year})</p>
                    </Media>
                    <Button color="primary" onClick={goToMovie}>View on Criterion</Button>
                </Container>
            </Media>
        </Media>
    )
}

export const MovieSelector = () => {
    const [suggestedMovie, setSuggestedMovie] = useState<IMovie | null>(null);

    const selectMovie = () =>
        setSuggestedMovie(findRandomMovie(movieList));

    return (
        <div>
            <Container>
                <Jumbotron>
                    <h1 className="display-5">Random Movie Selector</h1>
                    <hr className="my-2"/>
                    {!suggestedMovie &&
                        <>
                            <p className="lead">Let the Goddess of Fortune, Tyche,
                                assign you a movie on Criterion Channel.</p>
                            {/*<p className="font-italic">O Goddess Tyche</p>*/}
                            <p className="lead">
                                <Button color="primary" onClick={selectMovie}>I accept my fate</Button>
                            </p>
                        </>
                    }
                    {suggestedMovie &&
                        <p>
                            <p className="lead">The Goddess of Fortune, Tyche, Has Determined Your Future.</p>

                            <MoviePreview movie={suggestedMovie} />
                        </p>
                    }


                </Jumbotron>
                <Container>
                    <p className="font-italic">We like Criterion---but this page isn't associated with them in any way.</p>
                </Container>

            </Container>
        </div>);
}