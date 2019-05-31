const mongoose = require("mongoose");

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb://localhost:27017/tazzyco`, dbOptions);
        mongoose.set('useFineAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Mongoose succesfully connected!')
        });

        mongoose.connection.on('error', err => {
            console.error(`Mongoose connection error: ${err.stack}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose succesfully disconnected!')
        });

    }
};