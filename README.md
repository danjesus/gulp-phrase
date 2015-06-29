# gulp-phrase

A simple gulp plugin to use phraseapp, this lib donwload all internationalization and save in specifc path.

[![Code Climate](https://codeclimate.com/github/danjesus/gulp-phrase/badges/gpa.svg)](https://codeclimate.com/github/danjesus/gulp-phrase)

# Install

```bash
$ npm install gulp-phrase --save-dev
```

# Usage

```javascript
var phrase = require('gulp-phrase');
gulp.task('gulp-phrase', function() {
   phrase({
        apiToken: 'YOUR PHRASEAPP API TOKEN HERE',
        dir: 'PAHT TO SAVE FILES',
        tag: 'OPTIONAL'
   }, function(files) {
    // Array whith filenames
    // Now you can iterate in array for change filenames
   });
});
````

# TODO

- Write tests
