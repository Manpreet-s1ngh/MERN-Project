import React, { createContext, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';

// all components
import Navbar from "./components/Navbar";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import Logout from "./components/Logout";

import {reducer,initialvalue} from './reducer/reducer'

export const UserContext=createContext();

//* Routing Component
const Routing=()=>{
  return (
    <>
      {/* Setting Routes */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/aboutme">
          <AboutMe />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route>
          <Error />
        </Route>
      </Switch>
    </>
  );
}

//* Main Component
function App() {

  const [state,dispatch]=useReducer(reducer,initialvalue);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing/>
      </UserContext.Provider>
    </>
  );
}

export default App;
