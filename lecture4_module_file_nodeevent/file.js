const fs = require("fs");


// writefile -> if file is not created it will create new file and overwrite the file data 
// writing file async
// fs.writeFile("./text.txt", "this is written by async", (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("done");
//     }
// })

// writing file sync
// fs.writeFileSync("./text.txt", "this is written by sync");

// reading file async
// fs.readFile("./text.txt","utf-8",(err,data) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("async -> ", data);
//     }
// })


// reading file async
// const data = fs.readFileSync('./text.txt',"utf-8");
// console.log("sync -> ", data);


// appending -> if file is not created it will and inside the file does not overwrite the file data
// appending file async
// fs.appendFile("text.txt", "\nthis is appended by asyn", (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("async data update");
//     }
// })
// appending file sync 
// fs.appendFileSync("text.txt", "\nthis appended by sync");
// console.log("sync data updated");


// delete the file 
// sync 
// fs.unlink("text.txt",(err) => {
//     if (err) {
//         console.log("there is some error");
//     }
//     else {
//         console.log("text.txt is deleted");
//     }
// })