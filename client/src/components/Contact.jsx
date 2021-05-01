import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Contact = () => {
  const history = useHistory();
  var [user, setUser] = useState({
    _id: "",
    fullname: "",
    phone: "",
    email: "",
    message: "",
  });

  //! defining function
  const callContact = async () => {
    try {
      console.log("Initiate Fetching");
      // making request
      const res = await fetch("/checkValidCookie", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(res);

      //cheking response
      console.log("checking response");
      const data = await res.json();
      console.log("got json");
      console.log(data);

      setUser({
        ...user,
        _id: data._id,
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
      });

      // console.log(user.fullname);
    } catch (err) {
      // history.push("/login");
      console.log(err);
      // window.alert("Problem in Requesting Server");
    }
  };

  //! useEffect
  //*this will run every time when this functino reloads
  useEffect(() => {
    console.log("using Effect");
    callContact();
  }, []);

  //! input handler
  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  //! submit button
  const saveMessage = async (event) => {
    event.preventDefault();
 try {
   const { _id, fullname, email, phone, message } = user;
   const res = await fetch("/saveMessageRoute", {
     method:"POST",
     headers: {
       "content-Type": "application/json",
     },
     body: JSON.stringify({
       _id,
       fullname,
       email,
       phone,
       message
     }),
   });
   console.log(res);
   const data=await res.json();
   console.log(data);
   if(res.status === 202){
     window.alert('Message SAved Successfully');
     return;
   }
   else{
     window.alert(data.error);
   }
    

 } catch (err) {
   console.log("In catch Block");
   console.log(err);
 }

  };

  return (
    <>
      {console.log("This is mydata:\n")}
      {console.log(user)}
      {/* Details */}
      <div className="container-fluid">
        <div className="main_box">
          {/* phone */}
          <div className="content">
            <h1>
              <i className="zmdi zmdi-phone-in-talk"></i>
            </h1>
            <div className="content-info">
              <h3>Phone</h3>
              <h4>+91 9872198555</h4>
            </div>
          </div>

          {/* Email */}
          <div className="content">
            <h1>
              <i className="zmdi zmdi-email"></i>
            </h1>
            <div className="content-info">
              <h3>Email</h3>
              <h4>manpreet@gmail.com</h4>
            </div>
          </div>

          {/* Location */}
          <div className="content">
            <h1>
              <i className="zmdi zmdi-pin-drop"></i>
            </h1>
            <div className="content-info">
              <h3>Address</h3>
              <h4>Bhai Manj Road , Amritsar</h4>
            </div>
          </div>
        </div>
      </div>

      {/* message */}
      <div className="container-fluid  py-4">
        <div className="message_box col-md-8 col-12 mx-auto">
          <h1>Get in touch</h1>
          <form method="POST">
            <div className="details">
              <input
                name="fullname"
                type="text"
                placeholder="Your name"
                value={user.fullname}
                onChange={onInputChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={user.email}
                onChange={onInputChange}
              />
              <input
                name="phone"
                type="text"
                placeholder="Your phone number"
                value={user.phone}
                onChange={onInputChange}
              />
            </div>
            <div className="message">
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="5"
                placeholder="Message"
                value={user.message}
                onChange={onInputChange}
              ></textarea>
            </div>
            <div className="send_button">
              <button className="btn_send" onClick={saveMessage}>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
