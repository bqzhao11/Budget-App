import React from "react";
import "../css/login.css";

import LoginButton from "./login_button";

export default class Treasurer extends React.Component {
  render() {
    return (
      // <div className = "position">
      //   <h1 className = "titleLogin"> Welcome To The DKE App </h1>
      //   <h2 className = "title2"> Sign In</h2>
      //   <button className = "btn btn-primary btn-lg" strong> Login With Google </button>
      // </div>
      <div className="main">
        <h1 className="sign"> Welcome </h1>
        <LoginButton />
        <button class="submit" align="center">
          Sign In With Google
        </button>
      </div>
    );
  }
}
