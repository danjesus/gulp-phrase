# gulp-phrase - beta

A simple gulp plugin to use phraseapp, this lib donwload all internationalization and save in specifc path.

[![Build Status](https://travis-ci.org/danjesus/gulp-phrase.svg)](https://travis-ci.org/danjesus/gulp-phrase)
[![Code Climate](https://codeclimate.com/github/danjesus/gulp-phrase/badges/gpa.svg)](https://codeclimate.com/github/danjesus/gulp-phrase)

# Install

```
npm install gulp-phrase
```

# Usage

```
var phrase = require('gulp-phrase');
gulp.task('gulp-phrase', function() {
   phrase({
        apiToken: 'YOUR PHRASEAPP API TOKEN HERE',
        dir: 'PAHT TO SAVE FILES',
        tag: 'OPTIONAL'
   }, function(files) {
    // array whith filenames

   });
});

````
