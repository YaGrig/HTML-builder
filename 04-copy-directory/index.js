const fs = require('fs');
const path = require('path');
let filesDirectory = [];
let fileNames = [];

fs.readdir(path.join(__dirname, '/files'), 
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const fileName = path.join(__dirname, `/files/${file}`);
        fileNames.push(file);
        filesDirectory.push(fileName);
      });
    }
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, (err) => {
      if(err){
        console.log(err);
      }
      console.log('Directory created successfully!');
    });
    for(let i = 0; i < filesDirectory.length; i++){
      fs.copyFile(filesDirectory[i], path.join(__dirname, `files-copy/${fileNames[i]}`),fs.constants.COPYFILE_FICLONE, (err) => {
        if(err){
          console.log(err);
        } else {
          console.log('success'); 
        }
      } );
    }
  });
fs.readdir(path.join(__dirname, 'files-copy'), (err,files) => {
  if (err){
    console.log(err);
  } else {
    files.forEach(item => fileNames.includes(item)? console.log(item) : fs.rm(path.join(__dirname, `/files-copy/${item}`), (err) =>{
      if(err){
        console.log(err);
      }
      console.log(`file ${item} deleted`);
    }));
  }
});



