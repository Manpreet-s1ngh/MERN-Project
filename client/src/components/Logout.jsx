import React,{useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App.js';

const Logout=()=>{

const {state,dispatch}=useContext(UserContext); //? consuming value sent by provider

const history=useHistory();
const performLogoutOperation=async()=>{

    try {
      const res = await fetch("/logoutRoute", {
        Accept:'application/json',
        method: "GET",
      });
      const data=await res.json();
      console.log(data);
      if (res.status === 200) {
        dispatch({type:"USER",payload:true}); //? changing STATE value

        window.alert("Logout Successful");
        history.push('/login');
      } else {
        window.alert("Error in Logout");
      }
    } catch (err) {
      window.alert("error");
      console.log(err);
    }
}

 useEffect(() => {
     performLogoutOperation();
 }, [])

 return(<>
 <h1>This is my logout Page</h1>
 <h3>Yes this is working very good</h3>
 </>)
}

export default Logout;