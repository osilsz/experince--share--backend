
import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import upload from "./../middlewares/multer.middleware.js";


const router = Router();

const cpUpload = upload.fields(
  [
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 8 }
  ])


router.route("/register").post(cpUpload, registerUser)


router.route("/login").get((req, res) => {  // Correct the order here
  return res.json({
    success: true
  });
});

export default router