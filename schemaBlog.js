// content of each blog
const mongoose=require('mongoose');

const schemaBlog = new mongoose.Schema({
    id: {
      type: String,
    },
    AutherName:{
        type: String,
    },
    Title: {
      type: String,
    },
    PublishedDate:{
        type: String,
    },
    ReadingTime:{
        type: String,
    },
    ResponseCount:{
        type: String,
    },
    tags:{
        type: String,
    },
    ReferenceLink:{
        type: String,
    },
    ContentHTML:{
        type: String,

    }
  })

module.exports=mongoose.model('BlogDetails',schemaBlog);