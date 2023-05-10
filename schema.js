// schema for blogs
const mongoose=require('mongoose');

const BlogSchema = new mongoose.Schema({
    id: {
      type: String,
    },
    BlogTitle: {
      type: String,
    },
    BlogLink: {
      type: String,
    },
    ImageLink: {
      type: String,
    },
    Tag : {
      type:String
    }
  })

module.exports=mongoose.model('Blog',BlogSchema);