import mongoose from 'mongoose';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema({
  videoFile: {
    type: String, //cloudinary url
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  //  mongoose.Schema.Types.ObjectId,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

}, {
  timestamps: true,
})

videoSchema.plugin(aggregatePaginate);

export const Video = mongoose.model('Video', videoSchema)