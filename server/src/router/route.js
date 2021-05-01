const expres = require("express");
const router = expres.Router();
const User = require("../model/collection");
const bcrypt = require("bcryptjs");
const authenticate=require('../middleware/authenticate');

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      profession,
      password,
      confirmpassword,
    } = req.body;
    console.log("i am here");

    if (
      !fullname ||
      !email ||
      !phone ||
      !profession ||
      !password ||
      !confirmpassword
    ) {
      console.log("empty data");
      return res.status(421).json({ Error: "Please Enter Full Details" });
    } else {
      if (password != confirmpassword) {
        console.log("password not matched");
        res.status(420).json({ Error: "Password Wrong" });
      } else {
        const newuser = new User({
          fullname, // fullname:fullname
          email,
          phone,
          profession,
          password,
        });
        console.log("saving data");
        const saved = await newuser.save();
        if (saved) {
          res.status(200).json({ Success: saved });
        } else {
          res.status(422).json({ err: "User Not Registered" });
        }
      }
    }
  } catch (err) {
    res.status(422).json({ error: "Unable to Get UserData" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log("\n\ngoing to login");
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Data not filled");
      res.status(420).json({ error: "Fill all Fields" });
    } 
    else{
    console.log("searching user");
    //searching user
    const userdata = await User.findOne({ email: email });
    if (userdata) {

      const isMatch = await bcrypt.compare(password, userdata.password)
      if (isMatch) {

        const token = await userdata.generateAuthToken();
        console.log(token);
        res.cookie("jwt", token);
        res.status(200).json({ Login_Success: userdata });
      } else {
        res.status(420).json({ Invalid_Credentials: " Wrong Password" });
      }
    } else {
      res.status(420).send("No user Exist");
    }
  }
  } catch (err) {
    res.status(421).json({ Error: "Unable to Get User Data" });
  }
});

//For Displaying All Data
router.get("/getall", async (req, res) => {
  const alluser = await User.find();
  res.send(alluser);
});


router.get("/checkValidCookie", authenticate, (req, res) => {
  console.log('\n Welcome to Router');
  const token=req.gottoken;
  const user=req.gotuser;
  res.status(200).send(user);
  
});


//route for saving message
router.post("/saveMessageRoute",async(req,res)=>{
      
      // getting the data sent by user
      const{_id,fullname,email,phone,message}=req.body;
      if(!_id){
        return res.json({error:"Please First Register Yourself "})
      }
      
      //  if fields are empty
      if(!fullname || !email || !phone || !message){
        console.log(req.body);
        return res.json({error:"Please Add all the Fields"})
      }
       
      // searching for user
      console.log("Searching User");
      const userData= await User.findOne({_id});
      
      //user found
      if(userData){
        console.log("User Found");
        // calling method to save user Message
        const somereturn=await userData.addMesaage(fullname,email,phone,message);
        res.status(202).json({Success:'Message Saved Successfully'});
      }
      else{
        //user not found
        return res.json({error:"user not found"})
      }   
     
});


//route for setting home Name
router.get("/checkUserName", authenticate, async (req, res) => {
  console.log("checking user name");
  const user = req.gotuser;
  console.log(user);
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(401).json({ error: "user not found" });
  }
});

//for logout operatiom

router.get("/logoutRoute",(req,res)=>{
  console.log("Clearing Cookie");
  res.clearCookie('jwt');
  res.status(200).json({success:'cookie cleared successfully'})
});

module.exports = router;
