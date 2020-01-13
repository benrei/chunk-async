const axios = require('axios').default;
const {chunk, chunkAndResolve, resolve} = require('../index');
const {getHpkm} = require('./asyncFunctions');

const chunk_test = ()=>{
  let items = [1,2,3,4,5,6,7,8,9,10];
  let chunkSize = 2;
  let chunks = chunk(items, chunkSize);
  console.log(chunks)
  //  [ [1,2], [3,4], [5,6], [7,8], [9,10] ]
};
chunk_test();

const chunkAndResolve_test = async (nvdbUrl)=>{
  if(!nvdbUrl) nvdbUrl = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/88.json?pretty=true&inkluder=geometri&srid=wgs84&antall=1000';
  let source = await axios.get(nvdbUrl);
  let result = await chunkAndResolve(source.data.objekter, 10, getHpkm, true);
  console.log(result[0])
  console.log(`Antall: ${source.data.objekter.length}`);
  return result;
};

//chunkAndResolve_test('https://www.vegvesen.no/nvdb/api/v2/vegobjekter/88.json?pretty=true&inkluder=geometri&srid=wgs84&antall=1000');

const resole_test = ()=>{
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
  });
};
// resoleTest()