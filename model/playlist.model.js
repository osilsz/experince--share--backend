import Mongoose from "mongoose";


const playlistSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
  },
  videos:
    [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      }
    ],
  owner: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
}, { timestamps: true })

export const Playlist = Mongoose.model('Playlist', playlistSchema)
