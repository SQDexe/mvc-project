const Film = require('../models/Film.js');

const renderHomePage = (req, res) => {
    res.render('home', {
        pageTitle: 'Film collection',
        films: Film.getAllFilms()
        });
    };

module.exports = {
    renderHomePage
    };