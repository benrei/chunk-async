const axios = require('axios').default;
const { parse } = require('wkt');

let asyncFunctions = {};

asyncFunctions.getHpkm = async (item)=>{
  const geoJSON = parse(item.geometri.wkt);
  let url = `https://www.vegvesen.no/nvdb/api/v2/posisjon?lat=${geoJSON.coordinates[0]}&lon=${geoJSON.coordinates[1]}&maks_avstand=100&maks_antall=10`;
  let tmp = await axios.get(url);
  let result = tmp && tmp.data && tmp.data[0];
  if(result) return result
};

module.exports = asyncFunctions;