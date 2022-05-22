const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), '', (err) => {
  if(err){
    console.log(err);
  }
  console.log('success coppy');
});
fs.readdir(path.join(__dirname, '/styles'), 
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const fileName = path.join(__dirname, `/styles/${file}`);
        if(path.parse(fileName).ext === '.css'){
          fs.readFile(
            fileName,
            'utf-8',
            (err, data) => {
              if (err) throw err;
              fs.appendFile(path.join(__dirname, 'project-dist/bundle.css'),data, (err) => {
                if(err){
                  console.log(err);
                }
                console.log('success coppy');
              });
            }
          );
        }
      });
    }});


