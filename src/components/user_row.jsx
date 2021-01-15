import axios from "axios";
import { backend_host, backend_port } from "../config.json";

const onNameClick = (e) => {
  console.log(e.target.getAttribute("user_id"));
  axios
    .get(
      `${backend_host}:${backend_port}/users/${e.target.getAttribute(
        "user_id"
      )}`
    )
    .then((response) => {
      sessionStorage.setItem("current_user_viewing", response.data.gmail);
      sessionStorage.setItem("viewing_other_user", true);
      window.location = "/dashboard";
    })
    .catch((err) => console.log(err));
};

export const UserRow = (props) => (
  <tr>
    <th
      onClick={onNameClick}
      scope="row"
      user_id={props.users_ids[`${props.first_name} ${props.last_name}`]}
    >
      {props.first_name} {props.last_name}
    </th>
    <td>${props.chap_dues}</td>
    <td>${props.intl_dues}</td>
    <td>${props.utilities}</td>
    <td>${props.fines}</td>
    <td>${props.misc}</td>
  </tr>
);
