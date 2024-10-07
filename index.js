import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Dbconnection from './db/db.js';
import cookieParser from 'cookie-parser';


const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json({
  limit: '16kb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())


// routes import
import userRouter from './routes/user.routes.js';


// routes declarations
app.use("/api/v1/users", userRouter)

// localhost:4000/api/v1/user/register
// app.get('/api/v1/users', (req, res) => {
//   return res.json({
//     message: 'Welcome to User API'
//   })
// })


Dbconnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }).catch(error => {
    console.log('Error connecting to mongodb database', error)
  })






