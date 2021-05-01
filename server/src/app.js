require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

require("./db/database");
const router = require("./router/route");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.use(bodyParser)

console.log("router setup");

const PORT = process.env.PORT;
app.use(router);

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
// app.get("/reg")

app.listen(PORT, () => {
  console.log("Server Start");
});
