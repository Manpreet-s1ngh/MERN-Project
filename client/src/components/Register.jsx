  import React, { useState, useHistory } from "react";
import RegisterImage from "../images/register.svg";
const Register = () => {
  // const history = useHistory();

  const [user, updateUser] = useState({
    fullname: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmpassword: "",
  });
  // Code for Handling inputs
  const handleInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateUser({ ...user, [name]: value });
  };

  // code for submit Button
  const postData = async (event) => {
    event.preventDefault();

    console.log("btn clicked");
    const {
      fullname,
      email,
      phone,
      profession,
      password,
      confirmpassword,
    } = user;
    // if Fields are Emptu
    if (
      !fullname ||
      !email ||
      !phone ||
      !profession ||
      !password ||
      !confirmpassword
    ) {
      window.alert("All Fields required");
      return;
    }

    //  if password are different
    if (password != confirmpassword) {
      return window.alert("Password Not Matching");
    }
    console.log("going to Store");
    try {
      //* making request
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          profession,
          password,
          confirmpassword,
        }),
      });

      // console.log("got responce");
      // const data = await res.json();

      //*checking response
      console.log(res);
      if (res.status === 420) {
        window.alert("Password missMatch");
      } else if (res.status === 421) {
        window.alert("Fill Out Fields Properly");
      } else if (res.status === 422 || !res) {
        window.alert(
          "Please, Try Again \n Some Error happened During Registration"
        );
      } else if (res.status === 200) {
        window.alert("User Registered Successfully");
        // history.push("/login");
      }
    } catch (err) {
      window.alert("Eroor N Storing res");
    }
  };

  return (
    <>
      <div className="main_container">
        <div className="inner_container mx-auto">
          <div className="registerForm col-md-6 col-12 mx-auto">
            <h1>Sign up</h1>
            <form method="POST">
              {/* your name */}
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account"></i>
                </label>
                <input
                  name="fullname"
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  autoComplete="off"
                  value={user.fullname}
                  onChange={handleInputs}
                />
              </div>
              {/* email */}
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email"></i>
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>
              {/* phone */}
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input
                  name="phone"
                  type="number"
                  id="phone"
                  aria-describedby="emailHelp"
                  placeholder="Phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                />
              </div>

              {/* profession */}
              <div className="form-group">
                <label htmlFor="profession">
                  <i className="zmdi zmdi-case-check"></i>
                </label>
                <input
                  name="profession"
                  type="text"
                  id="profession"
                  aria-describedby="emailHelp"
                  placeholder="Profession"
                  autoComplete="off"
                  value={user.profession}
                  onChange={handleInputs}
                />
              </div>
              {/* password */}
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock-outline"></i>
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>

              {/* confirm password */}
              <div className="form-group">
                <label htmlFor="confirmpassword">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  name="confirmpassword"
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  value={user.confirmpassword}
                  onChange={handleInputs}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={postData}
              >
                Let's GO
              </button>
            </form>
          </div>
          <div className="registerImage col-md-6 col-12 order-1">
            <figure>
              <img src={RegisterImage} alt="Please Register" />
              <figcaption>
                I am already Registered, <a href="">Login</a>{" "}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
