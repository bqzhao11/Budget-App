import React from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "./../config.json";

require("dotenv").config();

const clientId = GOOGLE_CLIENT_ID;

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      gmail: "",
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }
  onSuccess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
    this.setState({
      loggedIn: true,
      gmail: res.profileObj.email,
    });
  };

  onFailure = (res) => {
    console.log("[Login failed] res:", res);
    this.setState({
      loggedIn: false,
      gmail: "",
    });
  };
  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <Redirect
            to={{ pathname: "/dashboard", state: { gmail: this.state.gmail } }}
          />
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            cookiePolicy={"single_host_origin"}
            style={{ marginTop: "100px" }}
            isSignedIn={true}
          />
        )}
      </div>
    );
  }
}
