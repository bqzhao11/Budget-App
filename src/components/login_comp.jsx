import React from "react";
import "../css/login.css";

import LoginButton from "./login_button";

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <div className="loginBody">
          <main>
            <div className="main">
              <h1 className="sign"> Welcome </h1>
              <LoginButton />
            </div>
          </main>
        </div>
      </div>
    );
  }
}
