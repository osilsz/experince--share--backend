import mongoose from "mongoose";



async function Dbconnection() {

  try {

    const response = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB", response.connection.host);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1)
  }
}


export default Dbconnection;