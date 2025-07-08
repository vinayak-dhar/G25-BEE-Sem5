const express = require('express');
const app = express();
const PORT = 4000;


// generic middleware
// app.use((req,res,next) => {
//     console.log('generic middleware');
//     next();
// })


// path specific middleware
// this will also run if the path is followed by this path
// like for /user 1st generic middleware will run then this middleware will run
// will run for -> /user/all, /user/:id/update.....
// will not run for -> /userAll, /user-all, /user_all
// app.use('/user',(req,res,next) => {
//     console.log("/user path middleware");
//     next();
// })

// put it to that api where we want to run this middleware on 
// function userVerify(req,res,next) {
//     console.log("api specific middleware");
//     next();
// }


// app.get('/', (req,res) => {
//     console.log('home route');
//     res.send('ok');
// })



// in this there will be error for headers because both /user are running
// if the userVerify is not pass then the request will be stuck in app.get('/user')
// this means there is multiple response for 1 request
// app.get('/user', userVerify, (req,res,next) => { // this will run 
//     console.log('/user api');
//     res.send('ok');
//     next();
// })
// app.get('/user', (req,res) => { // this will also run 
//     console.log('/user api');
//     res.send('ok 2');
// })



const middleware = require('./middleware');

app.use(middleware.genericMid);
app.use(middleware.pathSpecific);




app.listen(PORT,() => {
    console.log(`app live on ${PORT}`);
})