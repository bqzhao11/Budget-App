import React from "react";
import axios from "axios";
import LogoutButton from "./logout_button";
import UserInterFace from "./user_interface_comp";
import ReactList from "react-list";
import { backend_host, backend_port } from "../config.json";

export default class Dashboard extends React.Component {
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
      user_id: "",
      payments: [],
    };

    this.renderItem = this.renderItem.bind(this);
    this.extractData = this.extractData.bind(this);
  }

  async extractData(truncated_gmail) {
    const response1 = await axios.get(
      `${backend_host}:${backend_port}/users/email/${truncated_gmail}`
    );

    this.setState({
      first_name: response1.data.first_name,
      gmail: this.state.gmail,
      chap_dues: response1.data.chap_dues,
      intl_dues: response1.data.intl_dues,
      utilities: response1.data.utilities,
      fines: response1.data.fines,
      misc: response1.data.misc,
      user_id: response1.data._id,
    });

    const response2 = await axios.get(
      `${backend_host}:${backend_port}/payments/${this.state.user_id}`
    );

    this.setState({ payments: response2.data });
  }

  componentDidMount() {
    const truncated_gmail = this.state.gmail.substring(
      0,
      this.state.gmail.indexOf("@")
    );
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
        <h2>Payment History</h2>
        <div style={{ overflow: "auto", maxHeight: 200 }}>
          <ReactList
            itemRenderer={this.renderItem}
            length={this.state.payments.length}
            type="uniform"
          />
        </div>
      </div>
    );
  }
}
