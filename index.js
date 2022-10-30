const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');


startApp();

async function startApp() {

    const app = express();
    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log('Server listening on port 3000'));
}