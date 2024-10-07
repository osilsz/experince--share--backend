
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    trim: true,
    index: true, //searching feild enable
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, //cloudinary url
  },
  coverImage: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  watchHistory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video'
  }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);  // Await the hashing
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    fullname: this.fullname,
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}


userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign({
    id: this._id,
  }, process.env.REFRESH_JWT_SECRET, { expiresIn: '10d' })
}

export const User = mongoose.model('User', userSchema)