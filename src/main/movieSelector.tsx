import {
    Alert,
    Button,
    ButtonGroup,
    Col,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Jumbotron,
    Media,
    Row
} from "reactstrap";
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

interface IDirector {
    name: string,
    count: number
}

interface IYearSummary {
    [key: string]: number
}

interface ISummary {
    count: number,
    countries: { [key: string]: number },
    directors: { [key: string]: IDirector },
    years: IYearSummary
}

const movieList: IMovie[] = require('../data/films.json');

const metaDataPreDate: any = require('../data/filmsMetaData.json');

const metaData: IMovieMetaData = withDateStringsAsDates(metaDataPreDate);

const summary: ISummary = require('../data/summary.json');

const minDate = "1915";  // todo: calculate these
const maxDate = "2020";

const cropImgUrl = (imgUrl: string): string => {
    // original url:
    // https://vhx.imgix.net/criterionchannelchartersu/assets/bff62486-e5e9-4e8d-ad75-436cb2cf12c9.jpg
    // append this:
    // ?auto=format%2Ccompress&fit=crop,left&h=140&q=100&w=100&crop=left
    const width = 200;
    const height = 280;
    return `${imgUrl}?auto=format%2Ccompress&fit=crop,left&h=${height}&q=100&w=${width}&crop=left`
}

const skipMultipart = (movieSlug: string): boolean => {
    // todo: move this to the scraper
    if (movieSlug.indexOf("berlin-alexanderplatz") === 0 &&
        movieSlug !== 'berlin-alexanderplatz-part-1') {
        return true;
    }
    if (movieSlug.indexOf("-part-2") > 0 ||
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
        movieSlug.indexOf("-part-iv") > 0) {
        return true;
    }
    return false;
}

const findRandomMovie = (
    movieList: IMovie[],
    fromYear: string,
    toYear: string,
    countries: string[]
): IMovie | null => {

    console.log(`${fromYear}-${toYear}`);
    let selectedMovie: IMovie | null = null;
    let count = 0;
    const fromYearInt = parseInt(fromYear, 10);
    const toYearInt = parseInt(toYear, 10);
    for (let movie of movieList) {
        if (skipMultipart(movie.slug)) {
            continue;
        }
        const movieYear = parseInt(movie.year, 10);

        if (movieYear < fromYearInt || movieYear > toYearInt) {
            console.log("Skipping " + movieYear)
            continue;
        }
        count += 1;
        if (selectedMovie == null || Math.floor(Math.random() * count) + 1 === count) {
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
        <Media className="bg-light border rounded">
            <Media left href="#" onClick={goToMovie}>
                <Media object style={{"width": 200, "height": 280}} src={cropImgUrl(movie.img)} alt={movie.title}/>
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
                        <ButtonGroup>
                            <Button color="primary" onClick={goToMovie}>View on Criterion</Button>
                            <Button color="danger" onClick={resetMovie}>I've already seen it</Button>
                        </ButtonGroup>
                    </div>
                </Container>
            </Media>
        </Media>
    )
}


interface IYearSelectorProps {
    years: IYearSummary,
    name: string,
    label: string,
    selected: string,
    onChange: (year: string) => void
}

export const YearSelector = (
    {years, name, label, selected, onChange}: IYearSelectorProps) => {

    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    }

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{label}</InputGroupText>
                <Input type="select" name="{name}" id="{name}"
                       value={selected} onChange={onSelectionChanged}>
                {Object.entries(years).map(([year, count]) =>
                    <option key={year} value={year}>{year}</option>)}
                </Input>
            </InputGroupAddon>
        </InputGroup>
    );
}

export const MovieSelector = () => {
    const [suggestedMovie, setSuggestedMovie] = useState<IMovie | null>(null);
    const [fromYear, setFromYear] = useState<string>(minDate);
    const [toYear, setToYear] = useState<string>(maxDate);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);

    const changeFromYear = (year: string) => {
        setFromYear(year);
        if (parseInt(toYear, 10) < parseInt(year, 10)) {
            setToYear(year);
        }
    }
    const changeToYear = (year: string) => {
        setToYear(year);
        if (parseInt(year, 10) < parseInt(fromYear, 10)) {
            setFromYear(year);
        }
    }

    const selectMovie = () => {
        setHasSelected(true);
        setSuggestedMovie(findRandomMovie(movieList, fromYear, toYear, countries));
    }

    const onReset = (oldMovie: IMovie) => {
        setHasSelected(false);
        setSuggestedMovie(null);
        //setSuggestedMovie(findRandomMovie(movieList, fromYear, toYear, countries));
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
                {hasSelected && !suggestedMovie &&
                    <Alert color="danger">You have asked too much of the Goddess! Try again!</Alert>
                }
                    <Jumbotron className={"p-4"}>
                    <h1 className="display-6">Random Movie Finder</h1>
                    <hr className="my-2"/>
                    {!suggestedMovie &&
                    <>
                        <p className="lead">Let the Goddess of Fortune, <a
                            href="https://greekgodsandgoddesses.net/goddesses/tyche/" rel="noreferrer"
                            target="_blank">Tyche</a>,
                            assign you a movie from <a href="https://www.criterionchannel.com/" target="_blank"
                                                       rel="noreferrer">the Criterion Channel</a><sup>*</sup>.</p>
                        {/*<p className="font-italic">O Goddess Tyche</p>*/}

                        <Container>
                            <Row className="flex-row">
                                <Col xs="auto">

                                    <YearSelector label="From"
                                                  years={summary.years}
                                                  selected={fromYear}
                                                  name={"fromyear"}
                                                  onChange={changeFromYear}/>
                                </Col>
                                <Col xs="auto">
                                    <YearSelector label="To"
                                                  years={summary.years}
                                                  selected={toYear}
                                                  name={"toYear"}
                                                  onChange={changeToYear}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset="2" className="pt-3">
                                    <ButtonGroup>
                                        <Button color="primary" onClick={selectMovie}>I accept my fate</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        </Container>

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
                        <div className="text-muted">Powered by <a href="https://github.com/mikebridge/scrapeterion"
                                                                  rel="noreferrer"
                                                                  target="_blank">scrapeterion {metaData.scrapeterion}</a>.
                        </div>
                        <div className="text-muted font-italic"><sup>*</sup> This site is not affiliated with Criterion
                            Channel.
                        </div>
                    </div>

                </footer>
            </Container>
        </>
    );
}