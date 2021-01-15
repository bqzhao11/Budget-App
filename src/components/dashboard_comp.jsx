import React from "react";
import axios from "axios";
import LogoutButton from "./logout_button";
import ReactList from "react-list";
import { backend_host, backend_port } from "../config.json";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      gmail: "",
      chap_dues: 0,
      intl_dues: 0,
      utilities: 0,
      fines: 0,
      misc: 0,
      user_id: "",
      role: "",
      payments: [],
    };

    this.renderItem = this.renderItem.bind(this);
    this.extractData = this.extractData.bind(this);
    this.onTreasurerClick = this.onTreasurerClick.bind(this);
  }

  async extractData(truncated_gmail) {
    const response1 = await axios.get(
      `${backend_host}:${backend_port}/users/email/${truncated_gmail}`
    );

    // if the logged-in user is not in the database, log out and return to login screen
    if (response1.data === null) {
      if (window.gapi) {
        const auth2 = window.gapi.auth2.getAuthInstance();
        if (auth2 != null) {
          auth2.then(() => {
            auth2
              .signOut()
              .then(() => {
                auth2.disconnect();
                sessionStorage.clear();
                window.location = "/login";
              })
              .catch((err) => console.log(err));
          });
        }
      }
    }

    this.setState({
      first_name: response1.data.first_name,
      gmail: response1.data.gmail,
      chap_dues: response1.data.chap_dues,
      intl_dues: response1.data.intl_dues,
      utilities: response1.data.utilities,
      fines: response1.data.fines,
      misc: response1.data.misc,
      user_id: response1.data._id,
      role: response1.data.role,
    });

    if (!sessionStorage.getItem("viewing_other_user")) {
      sessionStorage.setItem("role", this.state.role);
    }

    const response2 = await axios.get(
      `${backend_host}:${backend_port}/payments/${this.state.user_id}`
    );

    this.setState({ payments: response2.data });
  }

  componentDidMount() {
    const field =
      sessionStorage.getItem("role") === "treasurer" &&
      sessionStorage.getItem("viewing_other_user")
        ? "current_user_viewing"
        : "user_gmail";
    const gmail = sessionStorage.getItem(field);
    const truncated_gmail = gmail.substring(0, gmail.indexOf("@"));
    this.extractData(truncated_gmail).catch((err) => console.log(err));
  }

  renderItem(index, key) {
    return (
      <div key={key}>
        Time of Transaction: {this.state.payments[index].date}
        <br />
        Amount: ${this.state.payments[index].amount} <br />
        Description: {this.state.payments[index].description} <br />
        <hr />
      </div>
    );
  }

  onTreasurerClick() {
    sessionStorage.setItem("viewing_other_user", false);
    window.location = "/treasurer";
  }

  render() {
    return (
      <div>
        <h1>This is the Dashboard Page</h1>
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
        <h2>Payment History</h2>
        <div style={{ overflow: "auto", maxHeight: 200 }}>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.state.payments.length}
            type="uniform"
          />
        </div>
        {sessionStorage.getItem("role") === "treasurer" ? (
          <button
            className="btn btn-primary"
            onClick={this.onTreasurerClick}
            type="button"
          >
            Treasurer
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
