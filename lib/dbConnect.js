import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI
// console.log(MONGODB_URI)
// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect

// export default {
//   connect: () => {
//     dotenv.config();
//     if (!process.env.MONGO_URL) {
//       console.error("Missing MONGO_URL!!!");
//       process.exit(1);
//     }
//     mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((res) => console.log("mongo db connection created"));
//     mongoose.connection.on('error',console.error.bind(console, 'connection error:'));
//   }
// };