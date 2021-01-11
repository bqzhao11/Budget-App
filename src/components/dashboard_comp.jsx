import React from "react";
import UserInterFace from "./user_interface_comp";

export default class Treasurer extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the Dashboard Page</h1>
        <UserInterFace/>
      </div>
    );
  }
}
