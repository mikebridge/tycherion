#!/usr/bin/env node

// npx ts-node -O '{"module":"commonjs"}' bin/lunr-update.ts
// npx ts-node bin/lunr-update.ts

import lunr, {Builder} from "lunr";
import films from "../src/data/films.json";
import fs from 'fs';

// const documents = [{
// 	"name": "Lunr",
// 	"text": "Like Solr, but much smaller, and not as bright."
// }, {
// 	"name": "React",
// 	"text": "A JavaScript library for building user interfaces."
// }, {
// 	"name": "Lodash",
// 	"text": "A modern JavaScript utility library delivering modularity, performance & extras."
// }]

const idx = lunr((builder : Builder) => {
	builder.ref('slug');
    builder.field('title');
    builder.field('geo');
    builder.field('genre');
	films.forEach(film => {
        console.log(`indexing ${film.slug}/${film.title}`);
		builder.add(film);
	});
})

// const result = idx.search("strawberries")

fs.writeFile('./src/data/index.json', JSON.stringify(idx), err => {
    if (err) {
        console.error(err)
        return
    }
})

// console.log(`wrote ${idx.toJSON().length} items`);

