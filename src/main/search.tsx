import React from 'react';
import lunr from 'lunr';
import films from '../data/index.json';

const lunr_idx = lunr.Index.load(films);

export const Search = () => (
    <>
        <div style={{marginTop:"100px"}}>Hello World Search</div>
        <pre>
            {JSON.stringify(lunr_idx.search("strawberries"))}
        </pre>

    </>
);