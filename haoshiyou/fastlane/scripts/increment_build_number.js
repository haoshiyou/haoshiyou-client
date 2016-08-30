#!/usr/bin/env node

// Save hook under `project-root/hooks/before_prepare/`
//
// Don't forget to install xml2js using npm
// `$ npm install xml2js`

var fs = require('fs');
var xml2js = require('xml2js');
var filePath = '../config.xml';
// Read config.xml
fs.readFile(filePath, 'utf8', function(err, data) {
    if(err) {
        return console.log(err);
    }

    // Get XML
    var xml = data;

    // Parse XML to JS Obj
    xml2js.parseString(xml, function (err, result) {
        if(err) {
            return console.log(err);
        }

        // Get JS Obj
        var obj = result;

        // Increment build numbers (separately for iOS and Android)
        var versionStr = obj['widget']['$']['version'];
        var splittedVersion = versionStr.split('.');
        console.log('Version (before) = ' + splittedVersion.join('.'));
        splittedVersion[splittedVersion.length - 1] =
            (parseInt(splittedVersion[splittedVersion.length - 1])
            + 1).toString();  // Increment last part.
        console.log('Version (after) = ' + splittedVersion.join('.'));
        obj['widget']['$']['version'] = splittedVersion.join('.');
        // Build XML from JS Obj
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(obj);

        // Write config.xml
        fs.writeFile(filePath, xml, function(err) {
            if(err) {
                return console.log(err);
            }

            console.log('Build number successfully incremented');
        });

    });
});
