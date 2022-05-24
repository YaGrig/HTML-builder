const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

console.log('введите текст')

let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdin.on('data', data => {
    if(data.toString() == 'exit\n'){
        writeStream.end()} else{
    writeStream.write(data)};   
});
writeStream.on('finish', (err) => {
    console.log('wrote all data to file');
    process.exit();

});
process.on('SIGINT', () => {
    console.log('wrote all data to file');
    process.exit();
});