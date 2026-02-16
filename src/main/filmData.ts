import {withDateStringsAsDates} from "./utils";
import films from '../data/films.json';
import filmsMetaData from '../data/filmsMetaData.json';
import summaryData from '../data/summary.json';
import genresData from '../data/genres.json';

export interface IMovie {
    title: string,
    url: string,
    img: string,
    country: string,
    year: string,
    director: string,
    slug: string,
    genre: string[],
    geo: string[]
}

export interface IMovieMetaData {
    date: Date,
    scrapeterion: string
}

export interface IDirectorSummary {
    name: string,
    count: number
}

export interface IYearSummary {
    [key: string]: number
}

export interface ICountrySummary {
    [key: string]: number
}

export interface IGenre {
    slug: string,
    name: string
}


export const movieList: IMovie[] = films as IMovie[];

export const metaData: IMovieMetaData = withDateStringsAsDates(filmsMetaData);

export const summary: ISummary = summaryData as ISummary;

export const genreData: IGenre[] = genresData as IGenre[];

interface ISummary {
    count: number,
    countries: ICountrySummary,
    directors: { [key: string]: IDirectorSummary },
    years: IYearSummary
}
