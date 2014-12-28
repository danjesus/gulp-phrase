/* global describe, it */
'use strict';

var phrase = require('../');
var assert = require('assert');
var fs = require('fs');

describe('gulp phrase test suite', function() {

    //set timeout to prevent mocha error in assyncrous execution
    this.timeout(150000);

    it('should download all phraseapp files', function(cb) {

        phrase({
            apiToken: '', //Need a phraseapp token
            tag: 'json',
            dir: 'locales/'
        }, function(files) {

        });
    });

    it('should check files downloaded', function(cb) {
        assert.equal(true, fs.existsSync('locales/phrase.United_States.json'), 'File is downloaded');
    });
});
