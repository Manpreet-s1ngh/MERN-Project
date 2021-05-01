const jwt = require("jsonwebtoken");
const User = require("../model/collection");
// require('cookie-parser')

const authenticate = async (req, res, next) => {
  // console.log("inside middle ware");
  try {
    //cheking cookie data
    const tokenCookie = await req.cookies.jwt;

    //if cookie not present
    if (!tokenCookie) {
      console.log("cookie not found");
      // *return res.status(401).send("Token Not Found");
      return res.status(401).json({ Error: "Token Not found" });
    }

    //cookie is present
    console.log(tokenCookie);

    //verifying cookie
    const result = jwt.verify(tokenCookie, process.env.SECRET_KEY);
    console.log(result); //this will return object of id and secret key

    // cookie is correct
    if (result) {
      //getting user of that cookie
      const ourUser = await User.findOne({ _id: result._id });

      //user is present
      if (ourUser) {
        // sending TOKEN and USER to ROUTE
        req.gottoken = tokenCookie;
        req.gotuser = ourUser;
        console.log("\nSuccessfull");
        next();
      } else {
        //user not present
        return res.status(401).send("User Not Present");
      }
    } else {
      //cookie is not correct
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Unable to Get Token From Cookie");
  }
};

module.exports = authenticate;
