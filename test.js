var json2multipleFiles = require('./index');
/*
 * Test Section 
 */
var testData = {
    fileName: 'test',
    data:
        Array(10)
            .fill(0)
            .map((item, index) => ({
                name: 'test' + index,
                age: index
            }))
}

// test save
json2multipleFiles.save(testData, './', 100, function (err, data) {
    console.log('save test', data);
});

// test read
json2multipleFiles.read('./', 'test', function (err, data) {
    console.log('read test', data.length);
});