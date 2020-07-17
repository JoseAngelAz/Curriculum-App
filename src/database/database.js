const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost/curriculumproject";

mongoose.connect(URI||process.env.URLDB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

async()=>{
    try {
        const connection = await mongoose.connection;
        await connection.once("open", () => {
          console.log("DB IS CONNECTED");
        });
      } catch (error) {
          console.log('Error happend while connecting to the DB', error.message);
      }
}


