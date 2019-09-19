module.exports = {
    writeToLogFile: function (fileName, fileData) {
        var fs = require('fs');

        fs.writeFile('./log-files/'+fileName, fileData, (err) => {
           console.log('The file has been saved!'), err;
         });    
    },
};