const notFoundController = require('express').Router();

notFoundController.get('/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        user: req.user
    });
});

module.exports = notFoundController;