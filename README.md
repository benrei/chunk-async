# chunk-async
Helps to chunk data and resolve async work to large datasets

[![NPM version](https://img.shields.io/npm/v/chunk-async.svg)](https://www.npmjs.com/package/chunk-async)

*Features*
- Chunk array[....] of data into array[[..]‚[..]]
- Resolve async work done on items
- Chunk and resolve async work, chunk by chunk

## Install

    npm install chunk-async

## Usage
### chunk()
Chunks array[....] of data into array[[..]‚[..]]
```js
const { chunk, chunkAndResolve, resolve } = require('async-work');

let items = [1,2,3,4,5,6,7,8,9,10];
let chunkSize = 2;
let chunks = chunk(items, chunkSize);
console.log(chunks)
//  [ [1,2], [3,4], [5,6], [7,8], [9,10] ]

```

### resolve()
Resolves async work done on items
```js
const { resolve } = require('async-work');
const axios = require('axios').default;

let items = [1,2,3,4,5,6,7,8,9,10];
//  Example async work
let asyncWork = async (item)=>{
  let url = `https://jsonplaceholder.typicode.com/posts/${item}`;
  let result = await axios.get(url);
  return result.data
};

resolve(items, asyncWork).then(res=>{
  console.log(res)
  //  Items from  api
});
```


### chunkAndResolve()
Chunk and resolve async work, chunk by chunk
```js
const { chunkAndResolve } = require('async-work');
const axios = require('axios').default;

let persons = [{id: 1, name: 'John'}, ... {id:10000, name: 'Mark'}];  //  Large dataset
let chunkSize = 100;
let showDebug = true;
let asyncWork = async(person)=>{
  let result = await axios.get(`http://yourApi.com/getFullnameById/${person.id}`);
  person.fullname = result.data;
  return person;
};

chunkAndResolve(persons, chunkSize, asyncWork, showDebug).then(result=>{
  console.log(result)
  //  [ {id:1, name: 'John', fullname: 'John Doe'}, ...]
})

```

