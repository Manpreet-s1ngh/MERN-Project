import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <div className="outer_home">
        <h4>404</h4>
        <h1 style={{ textTransform: "uppercase" }}>Sorry,Page not Found</h1>
        <NavLink
          to="/"
          style={{
            color:'blue',
            fontSize:'1.5rem',
            padding: "1rem 3rem",
            border: "2px solid blue",
            background: "white",
            borderRadius:'20px'
          }}
        >
          Go Back To Home
        </NavLink>
      </div>
    </>
  );
};

export default Error;
