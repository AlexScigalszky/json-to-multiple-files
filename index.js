/* save json arrays acoording to file size. Is a file exceeding the 120mb limit, it will be saved in a new file.*/
var fs = require('fs');
var path = require('path');
var async = require('async');

var save = function (data, folder, maxFileSize, callback) {
    var file = path.join(folder, data.fileName);
    var data = JSON.stringify(data.data);
    var countParts = Math.ceil(data.length / maxFileSize);
    console.log({ countParts });
    var partSize = Math.ceil(data.length / countParts);
    console.log({ partSize });
    var parts = [];
    for (var i = 0; i < countParts; i++) {
        parts.push({
            start: i * partSize,
            end: (i + 1) * partSize
        });
    }
    async.map(parts, function (part, cb) {
        var start = part.start;
        var end = part.end;
        var partData = data.substring(start, end);
        var partFile = file + '.' + parts.indexOf(part);
        fs.writeFile(partFile, partData, function (err) {
            console.log('saving partFile: ' + partFile);
            if (err) {
                return callback(err);
            }
            callback(null, partFile);
        });
    }, function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// funtion that return the array from multiple files that are starting with the same name
var read = function (folder, fileName, callback) {
    var file = path.join(folder, fileName);
    var parts = [];
    var countParts = fs.readdirSync(folder).filter(function (file) {
        return file.indexOf(fileName) === 0;
    }).length;
    for (var i = 0; i <= countParts; i++) {
        parts.push(file + '.' + i);
    }
    async.map(parts, function (part, callback) {
        fs.readFile(part, function (err, data) {
            if (err) {
                return callback(null, '');
            }
            callback(null, data);
        });
    }, function (err, results) {
        if (err) {
            return callback(err);
        }
        var data = results.join('');
        callback(null, JSON.parse(data));
    });
};


module.exports = {
    save: save,
    read: read
};
