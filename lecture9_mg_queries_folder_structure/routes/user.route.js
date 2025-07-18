// file under routes mostly use name structure as -> user.rout.js
// user API ->

// post is generally secure therefore the data from the client to the server is done using post request
app.post('/user/create',async(req,res) => {
    try {
        const {name,email,age} = req.body;

        // 1st method -> 
        // const user = await User.create({ // if the key value are same we can directly write the name
        //     name:name,
        //     email:email,
        //     age:age
        // })

        // 2nd method ->
        // const user = await User.create({ // this is a time taking process -> therefore 1st it will execute then the statements after this is executed
        //     name,
        //     email,
        //     age
        // })


        // 3rd method -> used when there is very big api is created -> like we created a user and there is more other functions we need to do then there is a big api is created to save the data
        const user = new User({ // create a new document / object of User collection -> it is not save in the database
            name,
            email,
            age
        })
        await user.save();
        res.status(201).json({user});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
});


// put request is used to update the existing data -> and we need to be aware what data we need to update
app.put('/user/update/:id',async(req,res) => {
    try {
        const {id} = req.params; // we will extract the id which is visible in the api 
        const {name,age} = req.body;
        
        // 1st method -> it will only be updated by using id
        // this result will show data before updation
        // const result = await User.findByIdAndUpdate(id, {name:name,age:age});

        // 2nd method -> we can update the data using anything like even using email or name we just need to give how we are going to update the data
        const result = await User.updateOne({_id:id},{name:name,age:age});
        res.status(200).json({message:"user update successfully", result});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
});