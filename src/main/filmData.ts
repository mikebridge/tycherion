import {withDateStringsAsDates} from "./utils";

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


export const movieList: IMovie[] = require('../data/films.json');

export const metaDataPreDate: any = require('../data/filmsMetaData.json');

export const metaData: IMovieMetaData = withDateStringsAsDates(metaDataPreDate);

export const summary: ISummary = require('../data/summary.json');

export const genreData: IGenre[] = require('../data/genres.json');

interface ISummary {
    count: number,
    countries: ICountrySummary,
    directors: { [key: string]: IDirectorSummary },
    years: IYearSummary
}

