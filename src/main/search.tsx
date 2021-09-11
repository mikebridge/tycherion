import React from 'react';
import films from '../data/films.json';
import filmIndex from '../data/filmIndex.json';
import Fuse from "fuse.js";

const fuseOptions = {}
const fuseIndex = Fuse.parseIndex(filmIndex);
const fuse = new Fuse(films, fuseOptions, fuseIndex);

export const Search = () => (
    <>
        <div style={{marginTop:"100px"}}>Hello World Search</div>
        <pre>
            {JSON.stringify(fuse.search("strawberries"))}
        </pre>

    </>
);