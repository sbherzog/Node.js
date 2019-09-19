var fs = require('fs');

//Reat files
var data = require('./data.json');
console.log(data.name);

fs.readFile('./data.json', 'utf-8', (err, data) => {
    var data = JSON.parse(data);
    console.log(data.name);
})

//Read directory 
fs.readdir('c:/', (err, data) => {
    console.log(data)
})