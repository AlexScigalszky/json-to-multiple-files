var json2multipleFiles = require('./json-to-multiples-files');
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
json2multipleFiles.save(testData, './data', 100, function (err, data) {
    console.log('save test', data);
});

// test read
json2multipleFiles.read('./data', 'test', function (err, data) {
    console.log('read test', data.length);
});