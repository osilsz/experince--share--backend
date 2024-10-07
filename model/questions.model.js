import Mongoose from "mongoose";


const questionSchema = new Mongoose.Schema({
  name:
  {
    type: String,
    required: true
  },
  image:
  {
    type: String,
  },
  expimage:
  {
    type: String,
  },
  discription:
  {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  }

}, {
  timestamps: true
});

export const Question = Mongoose.model('Question', questionSchema);


