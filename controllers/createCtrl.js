const { createBlog } = require('../services/blogService');
const { parseError } = require('../util/parser');

const createController = require('express').Router();

createController.get('/', (req, res) => {
    res.render('create', {
        title: 'Create Page',
        user: req.user
    });
});

createController.post('/', async (req, res) => {
    const data = {
        title: req.body.title,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category,
        owner: req.user._id
    }
    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fields are required');
        }
        await createBlog(data);
        res.redirect('/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create Page',
            errors: parseError(error),
            user: req.user,
            data
        });
    }
});

module.exports = createController;