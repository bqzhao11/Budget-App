import React from "react";
import axios from "axios";
import LogoutButton from "./logout_button";
import UserInterFace from "./user_interface_comp";

export default class Treasurer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      gmail: this.props.location.state.gmail,
      chap_dues: 0,
      intl_dues: 0,
      utilities: 0,
      fines: 0,
      misc: 0,
    };
  }
  componentDidMount() {
    const truncated_gmail = this.state.gmail.substring(
      0,
      this.state.gmail.indexOf("@")
    );
    const get_route = `http://localhost:5000/users/email/${truncated_gmail}`;
    axios
      .get(get_route)
      .then((response) => {
        this.setState({
          first_name: response.data.first_name,
          gmail: this.state.gmail,
          chap_dues: response.data.chap_dues,
          intl_dues: response.data.intl_dues,
          utilities: response.data.utilities,
          fines: response.data.fines,
          misc: response.data.misc,
        });
      })
      .catch((error) => {
        console.log(error);
        window.location = "/login";
      });
  }
  render() {
    return (
      <div>
        <h1>This is the Dashboard Page</h1>
        <UserInterFace />
        <h3>
          First Name: {this.state.first_name} <br />
          Gmail: {this.state.gmail} <br />
          Chapter Dues: {this.state.chap_dues} <br />
          International Dues: {this.state.intl_dues} <br />
          Utilities: {this.state.utilities} <br />
          Fines: {this.state.fines} <br />
          Miscellaneous: {this.state.misc} <br />
        </h3>
        <LogoutButton />
      </div>
    );
  }
}
