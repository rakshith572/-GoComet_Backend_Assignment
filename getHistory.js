// gets the past searched tags
const Historytags = require('./schemaHistory');
const getHistory=()=>{
    return new Promise(async (resolve,reject)=>{
      const ans=await Historytags.find({});
      resolve(ans);
    });
  }
  module.exports={
    getHistory
  }