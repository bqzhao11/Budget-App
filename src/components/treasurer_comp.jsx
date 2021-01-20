import axios from "axios";
import React from "react";
import DropdownMultiselect from "./dropdown_select";
import { UserRow } from "./user_row";
import { backend_host, backend_port, date_format } from "../config.json";
import "../css/treasurer.css";

export default class Treasurer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users_ids: {},
      users_array: [],
      payment_category: "1",
      payment_amount: 0.0,
      payment_members: [],
      payment_split: false,
    };

    this.userList = this.userList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onSelectMembers = this.onSelectMembers.bind(this);
    this.onSplitChange = this.onSplitChange.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
  }

  updateTable() {
    axios
      .get(`${backend_host}:${backend_port}/users/`)
      .then((response) => {
        this.setState({
          users_ids: response.data.reduce((obj, user) => {
            obj[`${user.first_name} ${user.last_name}`] = user._id;
            return obj;
          }, {}),
          users_array: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    if (sessionStorage.getItem("role") === "treasurer") {
      this.updateTable();
    } else {
      window.location = "/dashboard";
    }
  }

  onChangeCategory(e) {
    this.setState({
      payment_category: e.target.value,
    });
  }

  onAmountChange(e) {
    this.setState({
      payment_amount: e.target.value,
    });
  }

  onSelectMembers(selected) {
    this.setState({
      payment_members: selected,
    });
  }

  onSplitChange(e) {
    this.setState({
      payment_split: e.target.value,
    });
  }

  async updateUsers(payment_amount) {
    for (let i = 0; i < this.state.payment_members.length; i++) {
      const current_user_id = this.state.users_ids[
        this.state.payment_members[i]
      ];

      const response = await axios.get(
        `${backend_host}:${backend_port}/users/${current_user_id}`
      );

      const { data } = await response;

      const updated_user = {
        gmail: data.gmail,
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        status: data.status,
        grad_year: data.grad_year,
        greek_class: data.greek_class,
        venmo_username: data.venmo_username,
        chap_dues: data.chap_dues,
        intl_dues: data.intl_dues,
        utilities: data.utilities,
        fines: data.fines,
        misc: data.misc,
      };

      const date = new Date();

      const payment = {
        date: date.toLocaleTimeString("en-US", date_format).toString(),
        user_id: current_user_id,
        amount: payment_amount,
      };

      switch (this.state.payment_category) {
        case "1":
          updated_user.chap_dues += payment_amount;
          payment.description = "Chapter Dues";
          break;
        case "2":
          updated_user.intl_dues += payment_amount;
          payment.description = "International Dues";
          break;
        case "3":
          updated_user.utilities += payment_amount;
          payment.description = "Utilities";
          break;
        case "4":
          updated_user.fines += payment_amount;
          payment.description = "Fines";
          break;
        case "5":
          updated_user.misc += payment_amount;
          payment.description = "Miscellaneous";
          break;
        default:
      }

      await axios
        .post(
          `${backend_host}:${backend_port}/users/${current_user_id}/update`,
          updated_user
        )
        .catch((err) => console.log(err));

      await axios
        .post(`${backend_host}:${backend_port}/payments/add`, payment)
        .catch((err) => console.log(err));
    }

    this.setState({
      payment_category: "1",
      payment_amount: 0.0,
      payment_members: [],
      payment_split: false,
    });

    this.updateTable();
  }

  onSubmit(e) {
    e.preventDefault();

    const payment_amount = parseInt(
      this.state.payment_split
        ? this.state.payment_amount / this.state.payment_members.length
        : this.state.payment_amount
    );

    this.updateUsers(payment_amount).catch((err) => console.log(err));
  }

  userList() {
    return this.state.users_array.map((user) => (
      <UserRow
        first_name={user.first_name}
        last_name={user.last_name}
        chap_dues={user.chap_dues}
        intl_dues={user.intl_dues}
        utilities={user.utilities}
        fines={user.fines}
        misc={user.misc}
        users_ids={this.state.users_ids}
      />
    ));
  }

  onDashboardClick() {
    window.location = "/dashboard";
  }

  render() {
    const dropdown_options = Object.keys(this.state.users_ids);

    const optionsArray = [];

    for (let i = 0; i < dropdown_options.length; i++) {
      optionsArray.push({
        key: dropdown_options[i],
        label: dropdown_options[i],
      });
    }

    return (
      <div className="table table-striped table-hover">
        <h1 className="header">Welcome Harsh</h1>
        <table className="table">
          <thead>
            <tr>
              <th key="Name" scope="col">
                Name
              </th>
              <th key="Chapter Dues" scope="col">
                Chapter Dues
              </th>
              <th key="Intl. Dues" scope="col">
                Intl. Dues
              </th>
              <th key="Utilities" scope="col">
                Utilities
              </th>
              <th key="Fines" scope="col">
                Fines
              </th>
              <th key="Misc" scope="col">
                Misc.
              </th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
        <form
          className="row gy-2 gx-3 align-items-center"
          onSubmit={this.onSubmit}
        >
          <div className="col-auto">
            <label
              className="visually-hidden"
              htmlFor="autoSizingSelect"
            ></label>
            <select
              onChange={this.onChangeCategory}
              className="dropdown-item"
              id="autoSizingSelect"
              value={this.state.payment_category}
            >
              <option value="1">Chapter Dues</option>
              <option value="2">Intl. Dues</option>
              <option value="3"> Utilities</option>
              <option value="4"> Fines</option>
              <option value="5"> Misc.</option>
            </select>
          </div>
          <div className="col-auto">
            <label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></label>
            <div className="input-group">
              <div className="input-group-text">$</div>
              <input
                type="text"
                className="form-control"
                value={this.state.payment_amount}
                id="autoSizingInputGroup"
                placeholder=" +/- 0.00"
                onChange={this.onAmountChange}
              ></input>
            </div>
          </div>
          <div className="col-auto">
            <DropdownMultiselect
              placeholder="Members"
              options={optionsArray}
              handleOnChange={this.onSelectMembers}
              name="Members"
              selected={this.state.payment_members}
            />
          </div>
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={this.state.payment_split}
                id="autoSizingCheck"
                onChange={this.onSplitChange}
              ></input>
              <label className="form-check-label" htmlFor="autoSizingCheck">
                Split?
              </label>
            </div>
          </div>
          <div className="col-auto">
            <input
              type="submit"
              value="Update"
              className="btn btn-primary btn-lg"
            />
          </div>
        </form>
      </div>
    );
  }
}
