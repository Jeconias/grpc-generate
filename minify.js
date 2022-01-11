const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');

const result = uglify.minify([
  fs.readFileSync(__dirname + '/constants.js', 'utf8'),
  fs.readFileSync(__dirname + '/index.js', 'utf8'),
  fs.readFileSync(__dirname + '/inputs.js', 'utf8'),
  fs.readFileSync(__dirname + '/helpers.js', 'utf8'),
  fs.readFileSync(__dirname + '/generate.js', 'utf8'),
]);

fs.writeFile(`lib.js`, result.code, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Success');
  }
});
