const Film = require('../models/Film.js');

const Converter = require('../utils/Converter.js');

const DEFAULT = {
    minDate: Converter.date2str(Film.defaultMinDate()),
    maxDate: Converter.date2str(Film.defaultMaxDate()),
    genres: Film.defaultGenres()
    };

const renderFilm = (req, res) => {
    res.render('film', {
        pageTitle: 'Film template',
        deafultValues: DEFAULT
        });
    };

const renderFilmAdd = (req, res) => {
    res.render('filmAdd', {
        pageTitle: `Adding new film`,
        deafultValues: DEFAULT
        });
    };

const saveFilmAdd = (req, res) => {
    let dir = '/';
    try {
        const { title, description, releaseDate, director, runtime, genre } = req.body;
        const poster = req.file.filename;
        const film = new Film(title, poster, description, releaseDate, director, Number.parseInt(runtime), genre);
        film.add();
        const [id, ] = Film.getAllFilms().at(-1);
        dir = `/film/view/${id}`;
        }
    catch (err) {
        console.error(err);
        }
    res.redirect(dir);
    };

const renderFilmEdit = (req, res) => {
    const id = req.params.id;
    if (Film.checkId(id)) {
        const film = Film.getFilm(id);
        res.render('filmEdit', {
            pageTitle: `Edit - "${film.title}"`,
            id,
            deafultValues: DEFAULT
            });
        }
    else
        res.redirect('/not-found');
    };

const saveFilmEdit = (req, res) => {
    let dir = '/';
    const id = req.params.id;
    if (Film.checkId(id)) {
        try {
            const { title, description, releaseDate, director, runtime, genre, watched, rating, review } = req.body;
            let poster;
            try { poster = req.file.filename; }
            catch (err) { poster = ''; }
            Film.change(id, {title, poster, description, releaseDate, director, runtime, genre, watched, rating, review});
            dir = `/film/view/${id}`;
            }
        catch (err) {
            console.error(err);
            }
        res.redirect(dir);
        }
    else
        res.redirect('/not-found');
    };

const deleteFilm = (req, res) => {
    const id = req.params.id;
    if (Film.checkId(id)) {
        Film.delete(id);
        res.redirect('/');
        }
    else
        res.redirect('/not-found');
    };

const renderFilmView = (req, res) => {
    const id = req.params.id;
    if (Film.checkId(id)) {
        const film = Film.getFilm(id);
        res.render('filmView', {
            pageTitle: `Data - "${film.title}"`,
            id,
            film
            });
        }
    else
        res.redirect('/not-found');
    };

module.exports = {
    renderFilm,
    renderFilmAdd,
    saveFilmAdd,
    renderFilmEdit,
    saveFilmEdit,
    deleteFilm,
    renderFilmView
    };