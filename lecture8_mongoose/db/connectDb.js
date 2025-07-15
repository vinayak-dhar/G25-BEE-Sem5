const mongoose = require('mongoose');

async function connectDB() {
    // connected to the cluster of the database
    // await mongoose.connect(process.env.DB_URL); // -> this will not allow the code under this to run / execute until this statement using await is executed or completed
    // or use this 

    // this make this function run parallel or simultaneously 
    mongoose.connect(process.env.DB_URL).then (() => {
        console.log("done"); // it will print after "connected to DB"
    })
    console.log("connected to DB"); // first it will print 
}

module.exports = connectDB;