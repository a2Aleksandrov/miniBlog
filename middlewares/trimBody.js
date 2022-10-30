//middleware for trimming all fields

module.exports = (...excludedKeys) => (req, res, next) => {
    if (req.body) {
        for (let key in req.body) {
            if (excludedKeys.includes(key)) {
                continue;
            }
            req.body[key] = req.body[key].trim();
        }
    }
    next();
};

//excludedKeys says witch fields NOT to trim !;