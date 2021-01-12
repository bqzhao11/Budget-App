import React from "react";
import "../css/login.css";

import LoginButton from "./login_button";

export default class Login extends React.Component {
  render() {
    return (
      <body className="loginBody">
        <main>
          <div className="main">
            <h1 className="sign"> Welcome </h1>
            <LoginButton />
            <button class="submit" align="center">
              Sign In With Google
            </button>
          </div>
        </main>
      </body>
    );
  }
}
