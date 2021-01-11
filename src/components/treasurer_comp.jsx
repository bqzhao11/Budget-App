import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import "../css/treasurer.css";

export default class Treasurer extends React.Component {
  render() {
    return (
      <div className = "table table-striped table-hover">
        <h1 className = "header">Welcome Harsh</h1>
        
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
          <tbody>
            <tr>
              <th scope="row">Alex</th>
              <td>$100</td>
              <td>$100</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
            <tr>
              <th scope="row">Ben</th>
              <td>$100</td>
              <td>$100</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
            <tr>
              <th scope="row">Harsh</th>
              <td>$100</td>
              <td>$100</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
          </tbody>
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
            <label className="visually-hidden" for="autoSizingInputGroup"></label>
            <div className="input-group">
              <div className="input-group-text">$</div>
              <input type="text" className="form-control" id="autoSizingInputGroup" placeholder=" +/- 0.00">
                </input>
            </div>
          </div>
          <DropdownMultiselect
        placeholder="Members"
        options={["Live-ins", "Greek Class", "Grad-Year", "Alex", "Ben", "Harsh"]}
        name="Members"
        />
          <div className="col-auto">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="autoSizingCheck">
                </input>
              <label className="form-check-label" for="autoSizingCheck">
                Split?
              </label>
            </div>
          </div>
          <div className="col-auto">
            <button className = "btn btn-primary btn-lg" strong> Update </button>
          </div>
        </form>
        
        
    </div>
      
    );
  }
}
