
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./components/nav/NavBar";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";



export const TennisMatchLove = () => {

return (
  <>
  <Route
    render={() => {
      if (localStorage.getItem("tennis_player")) {
        return (
          <> 
          
          <h1 className="main_tennis"> Welcome to Tennis Match Love! </h1>
          <h2> Let's Have Fun Playing Tennis</h2>
          <NavBar />
          <ApplicationViews />   
      </>
      );
      } else{
        return <Redirect to ="/login" />;
      }
    }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
)
}
   

    
          
  
        
