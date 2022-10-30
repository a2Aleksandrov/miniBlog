const { Schema, model, Types } = require('mongoose');

const IMG_PARSER = /^https?:\/\/.+$/i;

const blogSchema = new Schema({
    title: {
        type: String,
        minlength: [5, 'Title must be at least 5 characters long'],
        maxlength: [50, 'Title must be at most 50 characters long']
    },
    img: {
        type: String,
        validate: {
            validator: value => IMG_PARSER.test(value),
            message: 'Image Url should start with http:// or https://'
        }
    },
    content: {
        type: String,
        minlength: [10, 'Content must be at least 10 characters long']
    },
    category: {
        type: String,
        minlength: [3, 'Category must be at least 3 characters long']
    },
    followList: [{
        type: String,
        ref: 'User'
    }],
    createdAt: {
        type: String,
        required: true,
        default: () => (new Date()).toISOString().slice(0, 19)
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Blog = model('Blog', blogSchema);

module.exports = Blog;