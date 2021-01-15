import React from "react";
import { GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "./../config.json";

const clientId = GOOGLE_CLIENT_ID;

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.state = {
      logout: false,
    };
  }

  onSuccess = () => {
    this.setState({
      logout: true,
    });
    sessionStorage.clear();
  };

  render() {
    return (
      <div>
        {this.state.logout ? (
          <Redirect to="/login" />
        ) : (
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={this.onSuccess}
          />
        )}
      </div>
    );
  }
}
