// schema for history
const mongoose=require('mongoose');

const HistorySchema = new mongoose.Schema({
    tag: {
      type: String,
    }
  })

module.exports=mongoose.model('HistoryTags',HistorySchema);