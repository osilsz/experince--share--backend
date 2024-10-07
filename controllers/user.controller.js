import { User } from '../model/user.model.js';
import ApiError from '../utils/apiError.js';
import { fileuploder } from '../utils/cloudinaryFileuploader.js';
import Wrapper from './../utils/wrapper.js';



export const registerUser = Wrapper(async (req, res) => {
  const { name, email, password, fullname } = req.body;

  if ([name, email, password].some(item => item?.trim() === '')) {
    // throw new ApiError(400, "All Feild Required", "Invalid")
    res.status(404).json({
      message: 'All Feild Required',
      error: 'Invalid'
    })
  }


  // check if user exits
  const isUserExit = await User.findOne({
    $or: [{ email }, { name }]
  })



  if (isUserExit) {
    return res.status(400).json({
      message: "The username and email has already Taken"
    })
  }

  const isAvatarImageExit = req.files?.avatar[0]?.path;

  let avatar = '';

  if (isAvatarImageExit) {

    const fileuploaderResponse = await fileuploder(isAvatarImageExit)

    avatar = fileuploaderResponse.url
  }

  const user = {
    username: name,
    email,
    password,
    fullname,
    avatar,
    refreshToken: '',
  }

  //TODO: create a new user
  const newUser = await User.create(user)

  const token = await newUser.generateAccessToken();

  const UserInfo = await User.findById(newUser._id).select('-password -refreshToken');


  res.status(200).json({
    message: "OK ",
    sucess: true,
    message: "User created successfully",
    data: { UserInfo, AccessToken: token }
  })
})

