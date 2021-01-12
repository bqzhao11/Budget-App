import axios from "axios";
import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { UserRow } from "./user_row";
import "../css/treasurer.css";

export default class Treasurer extends React.Component {
  constructor(props) {
    super(props);
    this.userList = this.userList.bind(this);
    this.state = {
      users_dict: {},
      users_array: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        console.log(response);
        this.setState({
          users_dict: response.data.reduce((obj, user) => {
            obj[user._id] = user;
            return obj;
          }, {}),
          users_array: response.data,
        });
        console.log(this.state.users_dict);
      })
      .catch((err) => {
        console.log(err);
      });
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
      />
    ));
  }

  render() {
    return (
      <div className="table table-striped table-hover">
        <h1 className="header">Welcome Harsh</h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Dues</th>
              <th scope="col">Int.Dues</th>
              <th scope="col">Utilities</th>
              <th scope="col">Fines</th>
              <th scope="col">Mis</th>
            </tr>
          </thead>
          <tbody>{this.userList()}</tbody>
        </table>
        <form className="row gy-2 gx-3 align-items-center">
          <div className="col-auto">
            <label className="visually-hidden" for="autoSizingSelect"></label>
            <select className="dropdown-item" id="autoSizingSelect">
              <option selected>Payments</option>
              <option value="1">Dues</option>
              <option value="2">Int.Dues</option>
              <option value="3"> Utilities</option>
              <option value="4"> Fines</option>
              <option value="5"> Past Dues</option>
              <option value="5"> Mis</option>
            </select>
          </div>
          <div className="col-auto">
            <label
              className="visually-hidden"
              for="autoSizingInputGroup"
            ></label>
            <div className="input-group">
              <div className="input-group-text">$</div>
              <input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                placeholder=" +/- 0.00"
              ></input>
            </div>
          </div>
          <DropdownMultiselect
            placeholder="Members"
            options={[
              "Live-ins",
              "Greek Class",
              "Grad-Year",
              "Alex",
              "Ben",
              "Harsh",
            ]}
            name="Members"
          />
          <div className="col-auto">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="autoSizingCheck"
              ></input>
              <label className="form-check-label" for="autoSizingCheck">
                Split?
              </label>
            </div>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary btn-lg" strong>
              {" "}
              Update{" "}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
