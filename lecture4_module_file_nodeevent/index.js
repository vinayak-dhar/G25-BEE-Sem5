// const formatDate = require('./utils/date-converter'); // importing formatedate from date-converter to index.js

// const date = formatDate("07-07-2025");
// console.log(date);


// in this date_converter is a object that contains formatdate() and anotherFormat()
const date_converter = require("./utils/date-converter"); // importing more than 1 functions from date-converter

const date1 = date_converter.formatdate("07-07-2025");
const date2 = date_converter.anotherFormat("09-23-2025");
console.log(date1);
console.log(date2);