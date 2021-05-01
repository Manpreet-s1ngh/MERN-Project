require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  profession: {
    type: String,
  },
  password: {
    type: String,
  },
  Tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  message: [
    {
      name: String,
      email: String,
      phone: Number,
      message: String,
    },
  ],
});

//Hashing our Password
schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPass = await bcrypt.hash(this.password, 12);
    this.password = hashedPass;
    console.log(hashedPass);
  }

  next();
});

//Generating JsonWebToken
schema.methods.generateAuthToken = async function () {
  console.log("Generatiing token ... ");
  const mytoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  this.Tokens = this.Tokens.concat({ token: mytoken });
  console.log("Generated successfully");
  await this.save();
  return mytoken;
};

//Saving message to Database
schema.methods.addMesaage = async function (fullname, email, phone, message) {
  console.log("saving message ... ");

  //adding the message object
  this.message = this.message.concat({
    name: fullname,
    email: email,
    phone: phone,
    message: message,
  });
  console.log("Saved successfully");
  await this.save();
  return this.message;
};

//Creating Model
const User = mongoose.model("USER", schema);

//exporting model
module.exports = User;
