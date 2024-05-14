const { path, fs } = require('../utils/modules.js');
const Converter = require('../utils/Converter.js');

const ROOT = require('../utils/Path.js');
const DATA_PATH = path.join(ROOT, 'data', 'films.json');
const UPLOADS_DIR = path.join(ROOT, 'public', 'uploads');

const getNewID = () => Date.now().toString(16);

const films = [];

class Film {
    #title;
    #poster;
    #description;
    #releaseDate;
    #director;
    #runtime;
    #genre;
    #watched;
    #rating;
    #review;

    constructor(title, poster, description, releaseDate, director, runtime, genre) {
        this.title = title;
        this.poster = poster;
        this.description = description;
        this.releaseDate = releaseDate;
        this.director = director;
        this.runtime = runtime;
        this.genre = genre;
        this.watched = false;
        this.rating = 0;
        this.review = '';
        }

    add() {
        films.push([getNewID(), this]);
        writeFilmsFile();
        readFilmsFile();
        }
    toJSON() {
        return {
            title: this.#title,
            poster: this.#poster,
            description: this.#description,
            releaseDate: Converter.date2str(this.#releaseDate),
            director: this.#director,
            runtime: this.#runtime,
            genre: this.#genre,
            watched: this.#watched,
            rating: this.#rating,
            review: this.#review
            };
        }
    getFormatedReleaseDate() {
        return Converter.invertDate(this.releaseDate);
        }
    getFormatedGenre() {
        return this.genre.at(0).toUpperCase() + this.genre.slice(1);
        }

    static delete(id) {
        films.splice(films.findIndex(([filmID, ]) => id === filmID), 1);
        writeFilmsFile();
        readFilmsFile();
        }
    static change(id, opt) {
        const film = Film.getFilm(id);
        for (let [key, val] of Object.entries(opt))
            if (val !== '')
                film[key] = key === 'runtime' || key === 'rating' ?
                    Number.parseInt(val) :
                    key === 'watched' ?
                        val === 'on' :
                        val;
        writeFilmsFile();
        readFilmsFile();
        }
    static getFilm(id) {
        return films[films.findIndex(([filmID, ]) => id === filmID)][1];
        }
    static getAllFilms() {
        return films;
        }
    static defaultGenres() {
        return ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'historical', 'horror', 'musical', 'noir', 'romance', 'science fiction', 'thriller', 'western'];
        }
    static defaultMinDate() {
        return new Date(1895, 12, 28);
        }
    static defaultMaxDate() {
        return new Date();
        }
        
    set title(value) {
        if (typeof value !== 'string' || value.length < 1 || 128 < value.length)
            throw new Error('Wrong title');
        this.#title = value;
        }
    set poster(value) {
        if (typeof value !== 'string' && !fs.existsSync(path.join(UPLOADS_DIR, value)))
            throw new Error('Wrong poster');
        this.#poster = value;
        }
    set description(value) {
        if (typeof value !== 'string' || value.length < 1 || 1024 < value.length)
            throw new Error('Wrong description');
        this.#description = value;
        }
    set releaseDate(value) {
        if (typeof value === 'string')
            value = Converter.str2date(value);
        if (!(value instanceof Date) || value < Film.defaultMinDate() || Film.defaultMaxDate() < value)
            throw new Error('Wrong release date');
        this.#releaseDate = value;
        }
    set director(value) {
        if (typeof value !== 'string' || value.length < 1 || 128 < value.length)
            throw new Error('Wrong director');
        this.#director = value;
        }
    set runtime(value) {
        if (typeof value !== 'number' || !Number.isInteger(value) || value < 1)
            throw new Error('Wrong runtime');
        this.#runtime = value;
        }
    set genre(value) {
        if (typeof value !== 'string' || !Film.defaultGenres().includes(value))
            throw new Error('Wrong genre');
        this.#genre = value;
        }
    set watched(value) {
        if (typeof value !== 'boolean')
            throw new Error('Wrong watched value');
        this.#watched = value;
        }
    set rating(value) {
        if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || 5 < value)
            throw new Error('Wrong rating');
        this.#rating = value;
        }
    set review(value) {
        if (typeof value !== 'string' || value.length < 0 || 1024 < value.length)
            throw new Error('Wrong review');
        this.#review = value;
        }
    
    get title() { return this.#title; }
    get poster() { return this.#poster; }
    get description() { return this.#description; }
    get releaseDate() { return Converter.date2str(this.#releaseDate); }
    get director() { return this.#director; }
    get runtime() { return this.#runtime; }
    get genre() { return this.#genre; }
    get watched() { return this.#watched; }
    get rating() { return this.#rating; }
    get review() { return this.#review; }
    }

const readFilmsFile = () => {
    try {
        const data = fs.readFileSync(DATA_PATH);
        const arr = JSON.parse(data);
        films.splice(0);
        for (let [id, { title, poster, description, releaseDate, director, runtime, genre, watched, rating, review }] of arr) {
            const tmp = new Film(title, poster, description, releaseDate, director, runtime, genre);
            tmp.watched = watched;
            tmp.rating = rating;
            tmp.review = review
            films.push([id, tmp]);
            }
        }
    catch (err) {
        console.error(err);
        }
    };

const writeFilmsFile = () => {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(films));
        }
    catch (err) {
        console.error(err);
        }
    };

readFilmsFile();

module.exports = Film;