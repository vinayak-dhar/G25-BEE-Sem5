const express = require('express');
const verifyUser = require('../middleware/verify.middleware');
const { verifyGoldUser, verifyPlatinumUser} = require('../middleware/verifyPremium.middleware');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const router = express.Router();

// create product 
const products = [
    {
        name:"product 1",
        price:1999,
        description:"this is product 1"
    },
    {
        name:"product 1",
        price:2999,
        description:"this is product 1"
    },
    {
        name:"product 2",
        price:1099,
        description:"this is product 2"
    },
    {
        name:"product 3",
        price:2299,
        description:"this is product 3"
    },
    {
        name:"product 4",
        price:1799,
        description:"this is product 4"
    },
    {
        name:"product 5",
        price:500,
        description:"this is product 5"
    },
    {
        name:"product 6",
        price:5999,
        description:"this is product 6"
    }
]
router.get('/create/products',async(req,res) => {
    try {
        const allProducts = await Product.insertMany(products);
        res.status(200).json({ products:allProducts });
    } catch (error) {
        res.status(500).json({ message:error.message });
    }
})

router.post("/package/buy" ,verifyUser ,async(req,res) => {
    try{
        const { package } = req.query;
        if (!package) {
            throw new Error("package name is required");
        }
        const currUserId = req.user.id;
        const user = await User.findById(currUserId);
        user.package = package;
        if (package == "gold") {
            user.credits += 500;
        }
        if (package == "platinum") {
            user.credits += 1000;
        }
        await user.save();
        res.status(200).json({ message:"package bought successfully" });
    }
    catch(error) {
        res.status(500).json({ message:error.message});
    }
})


router.get('/gold/discount/:productId', verifyUser, verifyGoldUser, async(req,res) => {
    try{
        const { productId } = req.params;
        const userId = req.user.id;

        // Promise.all() 
        // - takes parameters as arrays of promises
        // - its run all the promises parallely
        // - it reduces time
        const [ user, product ] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if (user.credits - (product.price * 0.1) < 0) {
            throw new Error("Not enough credits");
        }
        const discountedPrice = product.price - (product.price * 0.1);
        user.credits -= (product.price * 0.1);
        await user.save();
        res.status(200).json({ newPrice:discountedPrice });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
})

router.get('/platinum/discount/:productId', verifyUser, verifyPlatinumUser, async(req,res) => {
    try{
        const { productId } = req.params;
        const userId = req.user.id;

        // Promise.all() 
        // - takes parameters as arrays of promises
        // - its run all the promises parallely
        // - it reduces time
        const [ user, product ] = await Promise.all([
            await User.findById(userId),
            await Product.findById(productId)
        ]);

        if (user.credits - (product.price * 0.2) < 0) {
            throw new Error("Not enough credits");
        }
        const discountedPrice = product.price - (product.price * 0.2);
        user.credits -= (product.price * 0.2);
        await user.save();
        res.status(200).json({ newPrice:discountedPrice });
    }
    catch(error) {
        res.status(500).json({ message:error.message });
    }
})


module.exports = router;