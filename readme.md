# vinyl-read [![Build Status](https://travis-ci.org/SamVerschueren/vinyl-read.svg?branch=master)](https://travis-ci.org/SamVerschueren/vinyl-read)

> Create vinyl files from glob patterns


## Install

```
$ npm install --save vinyl-read
```


## Usage

```js
const vinylRead = require('vinyl-read');

vinylRead('*.js').then(files => {
    console.log(files.length);
    //=> '2'

    console.log(files[0].path);
    //=> '/Users/samverschueren/dev/vinyl-read/index.js'
});

const files = vinylRead.sync(['*.js', '!index.js']);
console.log(files.length);
//=> '1'

console.log(file[0].path);
//=> '/Users/samverschueren/dev/vinyl-read/test.js'
```


## API

### vinylRead(patterns, [options])

Returns a promise for an array of vinyl files.

### vinylRead.sync(patterns, [options])

Create an array of vinyl files synchronously and return them.

#### patterns

Type: `string`, `array`

See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### options

##### base

Type: `string`  
Default: `process.cwd()`

Override the `base` of the vinyl file.

##### cwd

Type: `string`  
Default: `process.cwd()`

Override the `cwd` (current working directory) of the vinyl file.

##### buffer

Type: `boolean`  
Default: `true`

Setting this to `false` will return `file.contents` as a stream. This is useful when working with large files. **Note:** Plugins might not implement support for streams.

##### read

Type: `boolean`  
Default: `true`

Setting this to `false` will return `file.contents` as null and not read the file at all.


## Related

- [vinyl-file](https://github.com/sindresorhus/vinyl-file) - Create a vinyl file from an actual file


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
