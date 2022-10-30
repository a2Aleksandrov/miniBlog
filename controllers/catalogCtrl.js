const { getAll } = require('../services/blogService');

const catalogController = require('express').Router();

catalogController.get('/', async (req, res) => {
    const blogs = await getAll().lean();
    res.render('catalog', {
        title: 'Catalog Page',
        user: req.user,
        blogs
    });
});

module.exports = catalogController;