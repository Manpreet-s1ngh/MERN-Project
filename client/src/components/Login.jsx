import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import loginImage from "../images/login.svg";

import {UserContext} from '../App.js';

const Login = () => {
  const {state,dispatch}=useContext(UserContext); //* consumer

  const history = useHistory();

  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const loginKro = async (event) => {
    event.preventDefault();

        if (!email || !password) {
          window.alert("Please Fill all Fields")
          return;
        } 

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Got Responce");
      // const data = await res.json();
      // console.log(data);

      console.log(res);

      if (res.status === 420) {
        window.alert("Invalid User");
      } else if (res.status === 421) {
        window.alert("Problem in Getting res \n Please TRY AGAIN ...");
      } else {
        dispatch({type:"USER",payload:false});
        window.alert("successfully Login");
        history.push("/");
      }
    } catch (er) {
      window.alert("Error in SignIn");
    }
  };

  
  return (
    <>
      <div className="main_container">
        <div className="inner_containerLogin mx-auto">
          <div className="loginImage registerImage col-md-6 col-12 ">
            <figure>
              <img src={loginImage} alt="Please Register" />
              <figcaption>
                I am Not Registered, <a href="/register">Create New Account</a>{" "}
              </figcaption>
            </figure>
          </div>

          <div className="loginForm registerForm col-md-6 col-12">
            <h1 className="sign-in">Sign In</h1>
            <form method="POST">
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
                  value={email}
                  onChange={(event) => {
                    updateEmail(event.target.value);
                  }}
                />
              </div>

              {/* password */}
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock"></i>
                </label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  value={password}
                  onChange={(event) => {
                    updatePassword(event.target.value);
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loginKro}
              >
                Let's GO
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
