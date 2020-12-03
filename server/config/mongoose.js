const mongoose = require('mongoose')

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB connected at ${connect.connection.host} `)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectMongoDB
