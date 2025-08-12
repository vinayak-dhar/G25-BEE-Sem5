const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcrypt');


// .get request does not have body therefore it will only send data through url -> that can easily hack
// therefore we used .post request for this
router.post('/signup', async(req,res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        // it will hash the password
        // 1st the data we need to bcrypt and 2nd is the i.e. 10 layer of hashing / salt round  -> maximum value is 31
        // the module will use the value enter and go through 2^rounds hashing iterations
        // 10 is the ideal value for salt round
        const hashPass = await bcrypt.hash(password,10);
        
        let user = await User.create({
            name:name,
            email:email,
            password:hashPass
        })
        res.status(200).json({ message:"user signup successfull", user });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
})

module.exports = router;