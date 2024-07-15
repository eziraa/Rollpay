// export const CustomTable =

import { CustomTable } from "./custom-table.style";
import { users_mock_data } from "./user-mock-data";

export const DisplayUsers = () => {
  return (
    <CustomTable>
      <tr>
        {Object.keys(users_mock_data[0]).map((key) => (
          <th>{key.at(0)?.toUpperCase() + key.slice(1)}</th>
        ))}
      </tr>
      {users_mock_data.map((user) => (
        <tr>
          {Object.values(user).map((value) => (
            <td>{value}</td>
          ))}
        </tr>
      ))}
    </CustomTable>
  );
};
