const { getAll } = require('../services/blogService');

const profileController = require('express').Router();

profileController.get('/', async (req, res) => {
    const blogs = await getAll().lean();
    let createdBlogs = 0;
    let followedBlogs = 0;
    let created = [];
    let followed = [];

    for (let blog of blogs) {
        if (blog.owner == req.user._id) {
            createdBlogs++;
            created.push(blog);
        }
        if (blog.followList.includes(req.user.username)) {
            followedBlogs++;
            followed.push(blog);
        }
    }
    
    res.render('profile', {
        title: 'Profile Page',
        user: req.user,
        createdBlogs,
        followedBlogs,
        created,
        followed

    });
});

module.exports = profileController;