const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
let array = [];

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
        console.log('Введите текст');
    }
);
stdin.on('data', data => fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data,
    err => {
        if (err) throw err;
    }
));
// array.forEach(item => );