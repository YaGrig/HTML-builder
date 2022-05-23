const fs = require('fs');
const path = require('path');
let text = '';
let components = [];
let filesDirectory = [];
let fileNames = [];

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if(err){
      console.log(err);
    }
    console.log('Directory created successfully!');
  });

fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        text += data;
        fs.readdir(path.join(__dirname, '/components'), 
  { withFileTypes: true },
  (err, files) => {
    console.log('\nCurrent directory files:');
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const filePath = path.join(__dirname, `/secret-folder/${file.name}`);
        components.push(path.parse(file.name).name);
      });
      components.map(item => {
        let component = new RegExp(`{{${item}}}`);
        let textOfComponent = '';
        fs.readFile(
            path.join(__dirname, `/components/${item}.html`),
        'utf-8',
        (err, data) => {
            if (err) throw err;
            textOfComponent = data;
            text = text.replace(component, textOfComponent);
            console.log(text)
            fs.writeFile(
                path.join(__dirname, '/project-dist/index.html'),
                text,
                (err) => {
                    if (err) throw err;
                    console.log('Введите текст');
                }
            );
        }
        )
      })
    }
  });
    },
);
fs.writeFile(path.join(__dirname, 'project-dist/style.css'), '', (err) => {
    if(err){
      console.log(err);
    }
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
                fs.appendFile(path.join(__dirname, 'project-dist/style.css'),data, (err) => {
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

fs.readdir(path.join(__dirname, '/assets'), 
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        const fileName = path.join(__dirname, `/assets/${file}`);
        fileNames.push(file);
        filesDirectory.push(fileName);
      });
    }
    fs.mkdir(path.join(__dirname, '/project-dist/assets/'), {recursive: true}, (err) => {
      if(err){
        console.log(err);
      }
      console.log('Directory created successfully!');
    });
    for(let i = 0; i < filesDirectory.length; i++){
      fs.copyFile(filesDirectory[i], path.join(__dirname, `/project-dist/assets/${fileNames[i]}`),fs.constants.COPYFILE_FICLONE, (err) => {
        if(err){
          console.log(err);
        } else {
          console.log('success'); 
        }
      } );
    }
  });
fs.readdir(path.join(__dirname, '/project-dist/assets/'), (err,files) => {
  if (err){
    console.log(err);
  } else {
    files.forEach(item => fileNames.includes(item)? console.log(item) : fs.rm(path.join(__dirname, `/project-dist/assets/${item}`), (err) =>{
      if(err){
        console.log(err);
      }
      console.log(`file ${item} deleted`);
    }));
  }
});



