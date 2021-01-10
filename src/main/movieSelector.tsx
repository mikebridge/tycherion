import {
    Alert,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Jumbotron,
    Label,
    Media,
    Row
} from "reactstrap";
import React, {useEffect, useState} from "react";
import {partition, timeAgoInWords, withDateStringsAsDates} from "./utils";

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

interface ICountrySummary {
    [key: string]: number
}

interface ISummary {
    count: number,
    countries: ICountrySummary,
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
    decades: string[],
    countries: string[]
): IMovie | null => {

    console.log(`${fromYear}-${toYear}`);
    console.log(countries);
    let selectedMovie: IMovie | null = null;
    let count = 0;
    const fromYearInt = parseInt(fromYear, 10);
    const toYearInt = parseInt(toYear, 10);
    const decadesInt = decades.map(d => parseInt(d, 10));
    for (let movie of movieList) {
        if (skipMultipart(movie.slug)) {
            continue;
        }
        const movieYear = parseInt(movie.year, 10);

        if (movieYear < fromYearInt || movieYear > toYearInt) {
            continue;
        }
        if (decadesInt.length > 0) {
            if (!decadesInt.map(d => [d, d + 9])
                .some(([from, to]) => movieYear >= from
                    && movieYear <= to
                )) {
                continue;
            }
        }


        if (countries.length > 0 && !countries.includes(movie.country) ) {
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

const getCountries = (): string[] => Object.keys(summary.countries)

const getDecades = (): number[] => {
    const startDecade = 1910;
    const currentYear = new Date().getFullYear();
    const currentDecade = currentYear - (currentYear % 10);
    return Array.from({length: (currentDecade - startDecade)/10 + 1 }, (
        x, i) => startDecade + i * 10);
}

interface IDecadeMultiSelectorProps {
    label: string,
    selectedDecades: string[],
    onChange: (decades: string[]) => void
}

export const DecadeMultiSelector = ({label, selectedDecades, onChange}: IDecadeMultiSelectorProps) => {
    const [decades, setDecades] = useState<string[]>(selectedDecades);
    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        const isChecked = (e.currentTarget as any).checked;
        if (isChecked) {
            const newDecades = [...decades, currentValue]
            setDecades(newDecades);
            onChange(newDecades);
        } else {
            const newDecades = decades.filter((decade) => currentValue !== decade);
            setDecades(newDecades);
            onChange(newDecades);
        }

    }
    return (
        <>
            <Row>
                {getDecades().map(decade => decade.toString()).map(decade =>
                    <Col lg={3} md={4} xs={6}>
                        <FormGroup check>
                            <Label check key={decade}>
                                <Input type="checkbox" name={decade} checked={decades.includes(decade)}
                                       value={decade} onChange={onSelectionChanged}/>&nbsp;{decade}s
                            </Label>
                        </FormGroup>
                    </Col>
                )}

            </Row>

        </>
    )
}

interface IDecadeSelectorProps {
    name: string,
    label: string,
    selectedDecade: string | null,
    onChange: (startYear: string) => void
}

export const DecadeSelectorDropDown = ({name, label, selectedDecade, onChange}: IDecadeSelectorProps) => {
    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        console.log("SELECTION CHANGED");
        onChange(e.currentTarget.value);
    }
    return(
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input type="select" value={selectedDecade??""}  name={name} id={name} onChange={onSelectionChanged}>
                {getDecades().map(decade =>
                    <option key={decade} value={decade}>{decade}s</option>)}
            </Input>
    </FormGroup>
    );
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
        console.log("SELECTION CHANGED");
        onChange(e.currentTarget.value);
    }

    return (
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input type="select" value={selected} name={name} id={name} onChange={onSelectionChanged}>
                {Object.entries(years).map(([year, count]) =>
                <option key={year} value={year}>{year}</option>)}
            </Input>
        </FormGroup>
    );
}

interface ICountryMultiSelectorProps {
    label: string,
    selectedCountries: string[],
    onChange: (country: string[]) => void
}

export const CountryMultiSelector = ({label, selectedCountries, onChange}: ICountryMultiSelectorProps) => {
    const [countries, setCountries] = useState<string[]>(selectedCountries);
    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        const isChecked = (e.currentTarget as any).checked;
        if (isChecked) {
            const newCountries = [...countries, currentValue]
            setCountries(newCountries);
            onChange(newCountries);
        } else {
            const newCountries = countries.filter((countries) => currentValue !== countries);
            setCountries(newCountries);
            onChange(newCountries);
        }
    }
    const countryStrings = getCountries().map(country => country.toString());
    return (
        <Row >
            {countryStrings.map(country =>
            <Col lg={3} md={4} xs={6}>
                <FormGroup check>
                    <Label check key={country}>
                        <Input type="checkbox" name={country} checked={countries.includes(country)}
                               value={country} onChange={onSelectionChanged}/>{country}
                    </Label>
                </FormGroup>
            </Col>
            )}
        </Row>
    )
}

interface ICountrySelectorProps {
    countries: string[],
    name: string,
    label: string,
    selected: string[],
    onChange: (countries: string[]) => void
}

export const CountrySelector = (
    {countries, name, label, selected, onChange}: ICountrySelectorProps
) => {
    const onSelectionChanged = (e: React.FormEvent<HTMLInputElement>) => {
        let selected: string[] = [];
        const options = (e.target as any).options;
        for (let i = 0, len = options.length; i < len; i++) {
            let opt = options[i];

            if (opt.selected) {
                selected.push(opt.value);
            }
        }
        onChange(selected);
    }
    return(
        <FormGroup>
            <Label for={name}>{label}</Label>
            <Input type="select" name={name} id={name} multiple
                   value={selected} onChange={onSelectionChanged}>
                {countries.map((country) =>
                    <option key={country} value={country}>{country}</option>)}
            </Input>
        </FormGroup>
    )
}

export const MovieSelector = () => {
    const [suggestedMovie, setSuggestedMovie] = useState<IMovie | null>(null);
    const [fromYear, setFromYear] = useState<string>(minDate);
    const [toYear, setToYear] = useState<string>(maxDate);
    const [decades, setDecades] = useState<string[]>([]);
    const [hasSelected, setHasSelected] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);

    const changeFromYear = (year: string) => {
        console.log("Setting from ", year)
        setFromYear(year);
        if (parseInt(toYear, 10) < parseInt(year, 10)) {
            console.log("SETTING TO YEAR " + year)
            setToYear(year);
        }
    }

    const changeToYear = (year: string) => {
        console.log("Setting to", year)
        setToYear(year);
        if (parseInt(year, 10) < parseInt(fromYear, 10)) {
            console.log("SETTING FROM YEAR " + year)
            setFromYear(year);
        }
    }

    const changeCountries = (countries: string[]) => {
        setCountries(countries);
    }

    const changeDecades = (decades: string[]) => {
        console.log(decades);
        setDecades(decades);
    }

    const selectMovie = () => {
        setHasSelected(true);
        setSuggestedMovie(findRandomMovie(movieList, fromYear, toYear, decades, countries));
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
                        <Form>
                        <Container>
                            <Row>

                                    <DecadeMultiSelector label="Decade"
                                                    selectedDecades={decades}
                                                    onChange={changeDecades}/>

                            </Row>

                            {/*<Row className="flex-row">*/}
                            {/*    <Col xs="auto">*/}

                            {/*        <YearSelector label="From"*/}
                            {/*                      years={summary.years}*/}
                            {/*                      selected={fromYear}*/}
                            {/*                      name={"fromyear"}*/}
                            {/*                      onChange={changeFromYear}/>*/}
                            {/*    </Col>*/}
                            {/*    <Col xs="auto">*/}
                            {/*        <YearSelector label="To"*/}
                            {/*                      years={summary.years}*/}
                            {/*                      selected={toYear}*/}
                            {/*                      name={"toYear"}*/}
                            {/*                      onChange={changeToYear}/>*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}


                                    <CountryMultiSelector label="Countries"
                                                     selectedCountries={countries}
                                                     onChange={changeCountries} />


                            <Row>
                                <Col offset="2" className="pt-3">
                                    <ButtonGroup>
                                        <Button color="primary" onClick={selectMovie}>I accept my fate</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>

                        </Container>
                        </Form>
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