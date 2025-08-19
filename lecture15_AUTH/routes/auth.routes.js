const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyUser = require('../middleware/verify.middleware');


// AUTHENTICATION:- 
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

// admin signup
router.post('/admin/signup',async(req,res) => {
    try {
        let { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const hashPass = await bcrypt.hash(password,10);
        
        let user = await User.create({
            name:name,
            email:email,
            password:hashPass,
            role:"admin"
        })
        res.status(200).json({ message:"user signup successfull", user });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
})

router.post('/login',async(req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).select("+password"); // now password field will be selected
        if (!user) {
            throw new Error("Invalid email or password");
        }
        // bcrypt.compare will encrypt the password that is from the user and will compare this with the hash password stored in the database
        // user.password -> undefined because in models we have select:false
        const isMatched = await bcrypt.compare(password,user.password);
        if (!isMatched) {
            throw new Error("Invalid email or password");
        }
        
        // AUTHRIZATION:-
        // creating a token -> there are some compulsory parameter i.e. 
        // 1. payload(user basic information) -> and sensitive information cannot be pass as a parameter
        // 2. we will pass a secrete key that is sensitive as password store this in .env -> Secret Key -> it is a string which used to create a unique "signature", which can't be decoded
        // 3. this parameter is optional -> like expire time period of login, different algorithm for generating jwt token
        const token = jwt.sign({ id:user._id, name:user.name, email:user.email },
            process.env.JWT_SECRET, { expiresIn:'1h', algorithm:"HS256" }
        );

        // cookies implementation
        res.cookie("token",token,{ httpOnly:true, secure:false, domain:"localhost", path:"/", maxAge:24*60*60*12 });
        // res.status(200).json({ message:"user loggedIn successfully", token:token }); -> now we don't need to send token in res
        res.status(200).json({ message:"user loggedIn successfully" });
    }
    catch(error) {
        res.status(400).json({ message:error.message });
    }
})


// now we will check if the user is authenticate or not
// this can be access by any type of users
// router.get('/check',async(req,res) => {
//     try{
//         res.status(200).json({ message:"welcome user" });
//     }
//     catch(error) {
//         res.status(400).json({ message:error.message });

//     }
// })


// accessible only to loggedin users
router.get('/check', verifyUser, async(req,res) => {
    try{
        // as it is it always run therefore we will create middleware for this
        // const authorization = req.headers.authorization; // -> client sends the token in header's autherization as "Bearer token"
        // // extract token from the header -> it is stored as -> Bearer token 
        // const token = authorization.split(" ")[1]; // this will create a array of this -> Bearer token 

        // // verify
        // // invalid token reason -> token expired, token is tampered -> it will return data that is wrapped while creating token
        // // this will create an error if there is invalid token
        // const payload = jwt.verify(token, process.env.JWT_SECRET); // will return the users information -> verify the token and secret key
        res.status(200).json({ message:"welcome user", user:req.user });
    }
    catch(error) {
        res.status(400).json({ message:error.message });

    }
})





module.exports = router;

// this jwt token is divide into 3 parts -> represents the 3 paramenters we passed
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. -> header (this is the algorithm we used for jwt)
// eyJpZCI6IjY4OWFlOWUxM2Y2ZmFlN2I3OWVkZGZlMyIsIm5hbWUiOiJ2aW5heWFrJ3Mgc29uIHNwYXJzaCIsImVtYWlsIjoidmluYXlhazEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzU1NDk4ODQxLCJleHAiOjE3NTU1MDI0NDF9. -> payload (user data)
// xnmYPta1pTQ8Tb7lSqezXO57N8NR-8mj-OX9MWO0kJk -> signature (encoded form of secret key -> not decodable)