var fs = require('fs');

var data = {
   name:'Samuel Herzog',
   phoneNumber: '845-352-5350'
} 

fs.writeFile('data.json', JSON.stringify(data), (err) => {
   console.log('The file has been saved!'), err;
});

//Writing to file
var data = {
   name:'Samuel',
   phoneNumber: '845-659-3189'
}

var fileName = 'data3.json'
var fileData = JSON.stringify(data);

var w = require('./write-to-log-files.js');
w.writeToLogFile(fileName, fileData);