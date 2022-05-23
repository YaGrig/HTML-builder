const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, '/secret-folder'), 
  { withFileTypes: true },
  (err, files) => {
    console.log('\nCurrent directory files:');
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const fileName = path.join(__dirname, `/secret-folder/${file.name}`);
          fs.stat(fileName, (error, stats) => {
            if (error) {
              console.log(error);
            }
            else {
              size = stats.size;
              console.log(file.name, path.parse(fileName).ext, size*0.001 + 'kb');
            }
          });
      });
    }
  });