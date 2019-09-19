/*
fs = require('fs');

data = fs.readdirSync('c:/');
console.log('data:', data);

console.log("this comes after")
*/

//call back
fs = require('fs');
function phoneNumber(err, data){
    console.log('data:', data);
}

data = fs.readdir('c:/', phoneNumber);
console.log("this comes after")