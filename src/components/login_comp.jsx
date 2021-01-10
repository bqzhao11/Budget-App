import React from "react";
export default class Treasurer extends React.Component {
  render() {
    return (
      <div>
        <img src="https://i.pinimg.com/originals/91/07/4b/91074bd8da17b085863a262c88197c95.png" className = "h-75 d-inline-block"></img>
        <div className = "position-absolute top-50 start-50 translate-middle">
          <h1 strong > Welcome To The DKE App </h1>
          <button className = "btn btn-primary btn-lg" strong> Login With Google </button>
        </div>
      </div>
    );
  }
}
