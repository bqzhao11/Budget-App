export const UserRow = (props) => (
  <tr>
    <th scope="row">
      {props.first_name} {props.last_name}
    </th>
    <td>${props.chap_dues}</td>
    <td>${props.intl_dues}</td>
    <td>${props.utilities}</td>
    <td>${props.fines}</td>
    <td>${props.misc}</td>
  </tr>
);
