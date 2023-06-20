const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URL;

const connectToMongo = () => {
    try {
        // console.log(mongoURI);
        mongoose.connect(mongoURI)
        console.log('Database connected Successfully!')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
};

module.exports = connectToMongo;