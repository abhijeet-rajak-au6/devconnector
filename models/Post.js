const { Schema, model } = require("mongoose");

const postSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required:true,
  },
  likes: [{
      user:{
          type:Schema.Types.ObjectId,
          ref:"user"
      },
  }],
  comments:[{
      user:{
          type:Schema.Types.ObjectId,
          ref:"user"
      },
      text:{
          type:String,
          required:true
      },
      date:{
          type:Date,
          default:Date.now()
      }
  }],
  date:{
      type:Date,
      default:Date.now()
  }
});


const postModel = model("post",postSchema);

module.exports = postModel;