const { getLastThree } = require('../services/blogService');

const homeController = require('express').Router();


homeController.get('/', async (req, res) => {
    const blogs = await getLastThree().lean();
    res.render('home', {
        title: 'Home Page',
        user: req.user,
        blogs
    });
});

module.exports = homeController;