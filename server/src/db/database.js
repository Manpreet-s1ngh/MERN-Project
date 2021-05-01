const mongoose = require("mongoose");

// const DB = process.env.DB;
const DB='mongodb://localhost:27017/mern-stack';
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log("Not Connected"));
