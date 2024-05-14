const renderNotFound = (req, res) => {
    res.status(404).render('notFound', {
        pageTitle: 'Not Found'
        });
    };

module.exports = {
    renderNotFound
    };