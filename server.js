import dbConnect from "./lib/dbConnect";
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
// dotenv.config();
// console.log("server")
// const MONGODB_URI = process.env.MONGODB_URI
// console.log(MONGODB_URI)
// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('MongoDB connection established successfully!');
// });
console.log("server")