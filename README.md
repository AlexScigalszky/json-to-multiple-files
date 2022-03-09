# json-to-multiple-files

Save and retrive json into and from multiple files (readable)
All data es saved as json fragmented

## Example of saved files

- File 0

```json
[{"name":"test0","age":0},{"name":"test1","age":1},{"name":"test2","age":2},{"name":
```

- File 1

```json
"test3","age":3},{"name":"test4","age":4},{"name":"test5","age":5},{"name":"test6","
```

- File 2

```json
age":6},{"name":"test7","age":7},{"name":"test8","age":8},{"name":"test9","age":9}]
```

## How to use

- Install

```bash
npm i json-to-multiple-files
```

- Import
```javascript
var json2multipleFiles = require('./json-to-multiples-files');
```

- Save
```javascript
var testData = [a big array];
var folder = './data';
var maxFileSize = 100;

json2multipleFiles.save(
    testData,
    folder,
    maxFileSize,
    function (err, data) {
        console.log('save test', data);
    }
);
```

- Read
```javascript
var folder = './data';
var startFilename = 'test';
json2multipleFiles.read(
    folder, 
    startFilename, 
    function (err, data) {
        console.log('read test', data.length);
    }
);
```
