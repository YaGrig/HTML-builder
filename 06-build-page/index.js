const fs = require('fs');
const path = require('path');
let text = '';
let components = [];
let filesDirectory = [];
let fileNames = [];
let FolderNames = [];

fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if(err){
      console.log(err);
    }
  });
  fs.mkdir(path.join(__dirname, 'project-dist/assets'), {recursive: true}, (err) => {
    if(err){
      console.log(err);
    }
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
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
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
            fs.writeFile(
                path.join(__dirname, '/project-dist/index.html'),
                text,
                (err) => {
                    if (err) throw err;
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
                });
              }
            );
          }
        });
      }});

const createCopyFolder = (paths) => {
fs.readdir(path.join(__dirname, paths), 
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        let stats 
        const fileName = path.join(__dirname, `${paths}/${file}`);
        fs.stat(fileName, (err, stat) =>{
            if(err) console.log(err);
            else stats = stat;
            if(stats.isDirectory()){
                FolderNames.push(file)
                fs.readdir(fileName, (err, files) => {
                    if (err) console.log(err);
                    if(files.length === 0) 
                    console.log(paths)
                    fs.mkdir(path.join(__dirname, `project-dist/${paths}/${file}`), {recursive: true}, (err) => {
                        if(err){
                          console.log(err);
                        }
                      });
                })
                let newPath = `${paths}/${file}`
                createCopyFolder(newPath);
            } else {
                fileNames.push({ paths: paths,
                                 name: file});
                filesDirectory.push(fileName);
            }
            fileNames.map(item => fs.mkdir(path.join(__dirname, `project-dist/${item.paths}`), {recursive: true}, (err) => {
                if(err){
                  console.log(err);
                }
              }));

              for(let i = 0; i < filesDirectory.length; i++){
                fs.copyFile(filesDirectory[i], path.join(__dirname, `/project-dist/${fileNames[i].paths}/${fileNames[i].name}`),fs.constants.COPYFILE_FICLONE, (err) => {
                  if(err){
                    console.log(err);
                  } else {
                  }
                } );
              }
              removeExtra(paths);
            });
      });
    }
})
const removeExtra = (paths) =>
fs.readdir(path.join(__dirname, `project-dist/${paths}`), (err,files) => {
    if (err){
      console.log(err);
    } else {
        {     files.forEach(file => {
              let stats 
              const fileName = path.join(__dirname, `project-dist/${paths}/${file}`);
              fs.stat(fileName, (err, stat) =>{
                  if(err) console.log(err);
                  else stats = stat;
                  if(stats.isDirectory()){
                      fs.readdir(fileName, (err, files) => {
                          if (err) console.log(err);
                          if(!FolderNames.includes(file)){
                              fs.rmdir(path.join(__dirname, `project-dist/${paths}/${file}`), {recursive: true, force: true}, (err) => {
                                      if(err){
                                        console.log(err);
                                      }
                                    });
                                }
                    })
                      let newPath = `${paths}/${file}`
                      removeExtra(newPath);
                  } else {
                      let array = [];
                      fileNames.map(item => array.push(item.name))
                     array.includes(file)? null : 
                     fs.rm(path.join(__dirname, `project-dist/${paths}/${file}`), (err) =>{
                        if(err){
                          console.log(err);
                        }
                        console.log(`file ${file} deleted`);
                      });
                  }
                  });
            });
          }
    }
  });
}
createCopyFolder('/assets')
