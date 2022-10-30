const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/miniBlog'

module.exports = async (app) => {
    try {
        mongoose.connect(CONNECTION_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected!');
        
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}