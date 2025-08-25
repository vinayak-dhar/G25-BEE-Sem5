const mongoose = require('mongoose');

async function connectDB() {
        mongoose.connect(process.env.DB_URI).then(() => {
        console.log("DB connected successfully");
    })
}

module.exports = connectDB;