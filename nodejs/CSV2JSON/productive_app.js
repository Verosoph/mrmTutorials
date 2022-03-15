// require csvtojson module
const CSVToJSON = require('csvtojson');
const fs = require('fs');

// convert users.csv file to JSON array
CSVToJSON().fromFile('pricelist.csv')
    .then(users => {
        // users is a JSON array
        // write JSON array to file
         fs.writeFile('priclist.json', JSON.stringify(users, null, 4), (err) => {
            if (err) {
               throw err;
             }
          });

    }).catch(err => {
        // log error if any
        console.log(err);
    });