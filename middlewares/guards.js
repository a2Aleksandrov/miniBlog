const { parseError } = require("../util/parser");

function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            const error = [{ msg: 'Not Authorized!' }]
            return res.render('login', {
                title: 'Login Page',
                errors: parseError(error)
            });
        }
    }
}

function isGuest() {
    return (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else {
            next();
        }
    }
}



module.exports = {
    hasUser,
    isGuest,
}