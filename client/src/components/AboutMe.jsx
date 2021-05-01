import React, { useEffect, useState } from "react";
import profilePic from "../images/profilePic.svg";
import { useHistory } from "react-router-dom";

const AboutMe = () => {
  const history = useHistory();
  var [user, setUser] = useState({});

  //! defining function
  const callAboutPage = async () => {
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
      console.log(data);
      setUser(data);
      // console.log(user.fullname);


      //Error
      if (res.status === 401) {
        history.push("/login");
        // window.alert("Invalid token or User");
      }
      
    } catch (err) {
      history.push("/login");
      // window.alert("Problem in Requesting Server");
    }
  };

  //! useEffect
  //*this will run every time when this functino reloads
  useEffect(() => {
    console.log("using Effect");
    callAboutPage();
  }, []);

  return (
    <>
      <div className="about_outerBox bg-light">
        <div className="about_container col-md-7 bg-white">
          {/* upper part */}
          <div className="row">
            <div className="profile_img col-md-4 col-12 ">
              <img src={profilePic} alt="UserProfile Image" />
            </div>
            <div className="about_header col-md-5 col-6">
              <div className="my_name">
                <h3>{user.fullname}</h3>
                <h4>{user.profession}</h4>
                <p>
                  RANKINGS: <strong>1/10</strong>{" "}
                </p>
              </div>

              <div className="tab_changer">
                <ul className="nav nav-tabs">
                  <li>
                    <a
                      id="aboutme-tab"
                      data-toggle="tab"
                      href="#aboutme"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item" role="tab">
                    <a
                      href="#timeline"
                      id="timeline-tab"
                      data-toggle="tab"
                      role="tab"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="btn_div col-md-2 col-6">
              <button className="edit_profile">Edit Profile</button>
            </div>
          </div>

          {/* below part */}

          <div className="row below_part">
            {/* Links */}
            <div className="col-md-4 col-12 order-md-0 order-1">
              <div className="work_links">
                <h5>Work Links </h5>

                <a href="#">Youtuber</a>
                <a href="#">Instagram</a>
                <a href="#">Manpreet Signh</a>
                <a href="#">Github Mern Dev</a>
                <a href="#">Web Developer</a>
                <a href="#">Figma</a>
                <a href="#">Software Engineering</a>
              </div>
            </div>

            <div
              className="tab_div col-8 no_padding no_margin"
              style={{ position: "relative" }}
            >
              {/* AboutMe  Left Part*/}
              <div
                id="aboutme"
                role="tabpanel"
                className="personal_details col-12 tab-pane fade show active no_margin no_padding"
                aria-labelledby="aboutme-tab"
                style={{ float: "left" }}
              >
                {/* userId */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>User ID</h5>
                  </div>
                  <div className="col-7">
                    <p>{user._id}</p>
                  </div>
                </div>
                {/* Name */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Name</h5>
                  </div>
                  <div className="col-7">
                    <p>{user.fullname}</p>
                  </div>
                </div>
                {/* Email */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Email</h5>
                  </div>
                  <div className="col-7">
                    <p>{user.email}</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Phone</h5>
                  </div>
                  <div className="col-7">
                    <p>{user.phone}</p>
                  </div>
                </div>
                {/* Profession */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Profession</h5>
                  </div>
                  <div className="col-7">
                    <p>{user.profession}</p>
                  </div>
                </div>
              </div>

              {/* TimeLine Right   Part */}
              <div
                className="personal_details col-md-12 tab-pane fade active"
                id="timeline"
                role="tabpanel"
                style={{ position: "absolute" }}
              >
                {/* userId */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Experience</h5>
                  </div>
                  <div className="col-7">
                    <p>Expert</p>
                  </div>
                </div>
                {/* Name */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Hourly Rate</h5>
                  </div>
                  <div className="col-7">
                    <p>10$/hr</p>
                  </div>
                </div>
                {/* Email */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Total Projects</h5>
                  </div>
                  <div className="col-7">
                    <p>230</p>
                  </div>
                </div>
                {/* Phone */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>English Level</h5>
                  </div>
                  <div className="col-7">
                    <p>Expert</p>
                  </div>
                </div>
                {/* Profession */}
                <div className="row_data">
                  <div className="col-5">
                    <h5>Availability</h5>
                  </div>
                  <div className="col-7">
                    <p>6 months</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
