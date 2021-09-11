import React from 'react';
import films from '../data/films.json';
import filmIndex from '../data/filmIndex.json';
import Fuse from "fuse.js";
// import 'bootstrap/dist/css/bootstrap.css';

const fuseOptions = {}
const fuseIndex = Fuse.parseIndex(filmIndex);
const fuse = new Fuse(films, fuseOptions, fuseIndex);

export const Search = () => (
    <>
        <div>TODO</div>
        <pre>
            {JSON.stringify(fuse.search("strawberries"))}
        </pre>
    </>
);