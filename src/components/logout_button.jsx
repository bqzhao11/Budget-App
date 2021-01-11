import React from "react";
import { GoogleLogout } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "./../config.json";

const clientId = GOOGLE_CLIENT_ID;

export default function Logout() {
  const onSuccess = () => {
    alert("Logout successful");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
