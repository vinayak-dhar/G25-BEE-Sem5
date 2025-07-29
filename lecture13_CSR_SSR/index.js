const express = require('express');
const app = express();
const PORT = 4000;
const path = require('path');



app.use(express.json());
app.use(express.urlencoded({extended: true}));

// takes the path of the folder from the route
// path.join(__dirname,"public") -> it provides the path of public folder (UI -> static files)
// app.use(express.static -> to direct API reques to public folder
// 1. API request get('/',() => { }) -> will look for index.html file in public and server willl send the file as response
app.use(express.static(path.join(__dirname,"public"))); // if it find the static file it will only render that file only not any API


// this will only run if no index.html file is present in public 
app.get('/',(req,res) => {
    res.send("server is running");
})



// showing data on frontend from backed -> we need to use Axios or fetch 
app.get('/user',(req,res) => {
    let result = {
        name: "dummy user",
        email: "dummy123@gmail.com",
        age: 21
    }
    res.status(200).json({result})
})


// 2nd method redirecting from '/' or /index.html to '/contact' or /contact.html
app.get('/contact',(req,res) => {
    res.redirect('contact.html');
})

app.listen(PORT,() => {
    console.log(`server is live on http://localhost:${PORT}`);
})