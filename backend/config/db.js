const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Conneted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Mongo Connected");
//   } catch (error) {
//     console.error("Mongo Connection Error:", error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
