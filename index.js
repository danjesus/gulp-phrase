var request = require('request');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var color = gutil.colors;

const PLUGIN_NAME = 'gulp-phrase';

function phrase(params, cb) {

    function pull(params , cb) {
        listLocales(params, cb);
    }

    function listLocales(params, cb) {
        makeApiRequest('locales', params, function(body) {
            var locales = JSON.parse(body);

            var syncArray = [];

            _.each(locales, function(locale, index) {
                syncArray[index] = function(cb) {


                    setTimeout(function() {
                        downloadTranslations(locale, params, function(res) {
                            cb(null, res);
                        });
                    }, 500);

                };
            });

            setTimeout(function() {
                async.series(syncArray, function(err, results) {
                    cb(results);
                });
            }, 500);
        });
    }

    function downloadTranslations(locale, params, cb) {
        var path = 'translations/download';
        var filename = params.dir + 'phrase.' + locale.name + '.json';
        var file = fs.createWriteStream(filename);

        //file handlers
        file
            .on('open', function() {
                process.stdout.write('Fetch locale -> ' + locale.name + '\r\n');
            })
            .on('error', function() {
                process.stdout.write(color.red('Error when fetch locale -> ' + locale.name + '\r\n'));
                cb(false);
            })
            .on('finish', function() {
                cb(filename);
                process.stdout.write(color.green('Downloaded ->' + filename + '\r\n'));
            });

        params.locale = locale.name;

        makeApiRequest(path, params, function(body) {
            file.write(body);
            file.end();
        });
    }

    function makeApiRequest(path, params, cb) {
        var uri = 'https://phraseapp.com/api/v1/' + path;

        request.get(prepareApiRequest(params, uri), function(err, response, body) {

            if (err) {
                cb(new PluginError(PLUGIN_NAME, err));
            }

            cb(body);
        });
    }

    function prepareApiRequest(params, path) {

        if (!params.apiToken || !params.dir) {
            throw new PluginError(PLUGIN_NAME, 'Invalid params');
        }

        var apiToken = params.apiToken;
        var tag = params.tag ? params.tag : false;
        var dir = params.dir ? params.dir : false;
        var format = 'simple_json';
        var locale = params.locale ? params.locale : false;

        var options = {
            url: path
        };

        if (apiToken) {
            options.qs = {
                'auth_token' : apiToken,
                'format': format
            };
        }

        if (tag) {
            options.qs.tag = tag;
        }

        if (dir) {
            options.dir = dir;
        }

        if (locale) {
            options.qs.locale = locale;
        }

        return options;
    }

    return pull(params, cb);
}

module.exports = phrase;
