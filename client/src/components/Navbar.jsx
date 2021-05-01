import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { NavLink } from "react-router-dom";

import {UserContext} from '../App.js';

const Navbar = () => {

   const {state,dispatch}=useContext(UserContext);
   
  // * component of all links
  const NavComponent=()=>{

    //? if login is cliked then Only show Logout Button
    if(state){
      return (
        <>
          <li className="nav-item ">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/aboutme"
            >
              AboutMe
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/register"
            >
              Register
            </NavLink>
          </li>
         
        </>
      );
    }
    //? if logout is cliked then show, Login and Register
    else{
      return (
        <>
          <li className="nav-item ">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/aboutme"
            >
              AboutMe
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              className="nav-link"
              activeClassName="active_link"
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        </>
      );
      
    }
      
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand pl-5" to="#">
          Manpreet Singh
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto pr-5">
            <NavComponent/>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
