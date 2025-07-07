

// function formatdate(date) {
//     let formatedDate = new Date(date).toLocaleDateString();
//     return formatedDate;
// }


// function anotherFormat(date) {
//     let formatedDate = new Date(date).toLocaleString();
//     return formatedDate
// }

// // module.exports = formatdate; // can export only one function
// module.exports = {formatdate,anotherFormat};


// another approach to export function -> it will also export the functions in the form of object 
module.exports.formatdate = function(date) {
    let formatedDate = new Date(date).toLocaleDateString();
    return formatedDate;
}


module.exports.anotherFormat = function(date) {
    let formatedDate = new Date(date).toLocaleString();
    return formatedDate
}