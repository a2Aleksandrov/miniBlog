const notFoundController = require("../controllers/404Ctrl");
const auth = require("../controllers/authCtrl");
const catalogController = require("../controllers/catalogCtrl");
const createController = require("../controllers/createCtrl");
const detailsController = require("../controllers/detailsCtrl");
const homeController = require("../controllers/homeCtrl");
const profileController = require("../controllers/profileCtrl");
const { hasUser } = require("../middlewares/guards");


module.exports = (app) => {
    app.use(homeController);
    app.use('/register', auth.registerController);
    app.use('/login', auth.loginController);
    app.use('/logout', auth.logoutController);
    app.use('/create', hasUser(), createController);
    app.use('/catalog', catalogController);
    app.use('/details', detailsController);
    app.use('/profile', profileController);

    app.all('/*', notFoundController);
}