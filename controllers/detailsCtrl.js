const { getById, editBlog, deleteBlog } = require('../services/blogService');
const { getUser } = require('../services/userService');
const { parseError } = require('../util/parser');

const detailsController = require('express').Router();

detailsController.get('/:id', async (req, res) => {
    let isOwner = false;
    let hasFollowers = false;
    let isFollowed = false;
    const blog = await getById(req.params.id).lean();
    const owner = await getUser((blog.owner).toString()).lean();

    if (req.user && req.user._id == blog.owner) {
        isOwner = true;
    }
    if (blog.followList.length > 0) {
        hasFollowers = true;
    }
    if (req.user && blog.followList.length > 0 && blog.followList.includes(req.user.username)) {

        isFollowed = true;
    }
    res.render('details', {
        title: 'Details Page',
        user: req.user,
        blog,
        owner,
        isOwner,
        isFollowed,
        hasFollowers
    });
});

detailsController.get('/:id/edit', async (req, res) => {
    const blog = await getById(req.params.id).lean();
    if (!req.user || req.user._id != blog.owner) {
        return res.redirect('/404');
    }
    res.render('edit', {
        title: 'Edit Page',
        user: req.user,
        blog
    });
});

detailsController.post('/:id/edit', async (req, res) => {
    const blog = await getById(req.params.id);
    if (!req.user || req.user._id != blog.owner) {
        return res.redirect('/404');
    }
    const data = {
        title: req.body.title,
        img: req.body.img,
        content: req.body.content,
        category: req.body.category
    }
    try {
        if (Object.values(data).some(v => !v)) {
            throw new Error('All fileds are required');
        }

        if (data.title.length < 5 || data.title > 50) {
            throw new Error('Title length must be between 5 and 50 characters long');
        }
        if (data.content.length < 10) {
            throw new Error('Content length must be at least 10 characters long');
        }
        if (data.category.length < 3) {
            throw new Error('Category length must be at least 3 characters long');
        }
        await editBlog(req.params.id, data);
        res.redirect('/details/' + req.params.id);
    } catch (error) {
        res.render('edit', {
            title: 'Edit Page',
            errors: parseError(error),
            user: req.user,
            data
        });
    }
});

detailsController.get('/:id/delete', async (req, res) => {
    const blog = await getById(req.params.id);
    if (!req.user || req.user._id != blog.owner) {
        return res.redirect('/404');
    }
    await deleteBlog(req.params.id);
    res.redirect('/catalog');
});

detailsController.get('/:id/follow', async (req, res) => {
    const blog = await getById(req.params.id);

    try {
        if (!req.user) {
            throw new Error('Please log in first!');
        }
        if (req.user._id == blog.owner) {
            throw new Error('You cannot follow your own Blog!');
        }
        if (blog.followList.length > 0 && blog.followList.includes(req.user.username)) {
            throw new Error('You already following that Blog!');
        }
        blog.followList.push(req.user.username);

        const data = {
            followList: blog.followList
        }
        await editBlog(req.params.id, data);
        res.redirect('/details/' + req.params.id);
    } catch (error) {
        res.render('404', {
            title: 'Not found',
            errors: parseError(error),
            user: req.user
        });
    }


});

module.exports = detailsController;