import Fuse from 'fuse.js'
import films from "../src/data/films.json";
import fs from 'fs';

const filmIndex = Fuse.createIndex(['slug', 'title', 'geo', 'genre'], films);

fs.writeFile('./src/data/filmIndex.json', JSON.stringify(filmIndex.toJSON()), err => {
    if (err) {
        console.error(err)
        return
    }
})
