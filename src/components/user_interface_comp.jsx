import React from "react";

export default class UserInterFace extends React.Component {
  render() {
    return (
      <div
        className="alert alert-primary position-absolute top-0 start-0"
        role="alert"
      >
        Welcome [user]
        <h2> hi </h2>
      </div>
    );
  }
}
