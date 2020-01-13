/**
 * Chunk array[....] of data into array[[..]‚[..]]
 * @param {Array} items - List of data
 * @param {number} chunkSize - Length of chunked array
 * @returns {Array<Array>} Data chunked into array of arrays
 */
const chunk = (items = [], chunkSize)=> {
  let R = [];
  for (let i=0,len=items.length; i<len; i+=chunkSize)
    R.push(items.slice(i,i+chunkSize));
  return R;
};

/**
 * Resolves async work done on items
 * @param {Array} items - list of data
 * @param {function} asyncFunc - Async work to be done for each item in chunk
 * @returns {Promise<void|*[]>}
 */
const resolve = async (items, asyncFunc )=>{
  let promises = items.map(item => asyncFunc(item));
  let temp = await Promise.all(promises);
  let result = temp.filter(t=>t);
  if(result.length > 0) return result
};

/**
 * Resolves async work, chunk by chunk
 * @param {Array} items - list of data
 * @param {number} chunkSize - Length of chunked array
 * @param {function} asyncWork - Async work to be done for each item in chunks
 * @param {boolean} [showDebug=false] - Logs loop progression to console
 * @returns {Promise<void|*[]>}
 */
const chunkAndResolve = async (items = [], chunkSize = 100, asyncWork, showDebug = false)=>{
  let chunks = chunk(items, chunkSize);
  let count = 1;  //  Count for loop
  let result = [];
  for(const chunk of chunks){
    if(showDebug) console.log(`Running chunk ${count} of ${chunks.length}`);
    try {
      let resolved = await resolve(chunk, asyncWork);
      if(resolved) result.push(...resolved)
    } catch(e){
      console.log(`One or more failed`);
      console.log(e)
    }
    count++
  }
  if(result.length > 0) return result
};

module.exports = {
  chunk,
  chunkAndResolve,
  resolve
};