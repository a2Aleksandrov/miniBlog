const User = require("../models/User");

function getUser(userId) {
    return User.findById(userId);
}

module.exports = {
    getUser
}