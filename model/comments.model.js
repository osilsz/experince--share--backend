import Mongoose from "mongoose";


const commentSchema = new Mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 3,
  },
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  }
}, { timestamps: true })


export const Comment = Mongoose.model('Comment', commentSchema)