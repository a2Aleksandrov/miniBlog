const Blog = require("../models/Blog");

function getAll() {
    return Blog.find({});
}
function getLastThree() {
    return Blog.find({}).sort({ createdAt: -1 }).limit(3);
}
function getById(blogId) {
    return Blog.findById(blogId);
}
function createBlog(data) {
    return Blog.create(data);
}
function editBlog(blogId, data) {
    return Blog.findByIdAndUpdate(blogId, data);
}
function deleteBlog(blogId, data) {
    return Blog.findByIdAndRemove(blogId, data);
}

module.exports = {
    getAll,
    getLastThree,
    getById,
    createBlog,
    editBlog,
    deleteBlog
}