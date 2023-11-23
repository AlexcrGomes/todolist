const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://root:fhRF2mJiKR1jEpk6@cluster0.bhhtmyt.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log('MongoDB connected')
    }).catch((err) => {
        console.log(err)
    });
};

module.exports = connectToDb;