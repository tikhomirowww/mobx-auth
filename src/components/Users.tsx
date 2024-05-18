import { FC, useEffect, useState } from "react";
import UserService from "../services/UserService";
import { observer } from "mobx-react-lite";
import { IUser } from "../models/IUser";

const Users: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    UserService.getUsers().then(({ data }) => setUsers(data));
  }, []);
  return (
    <ul>
      {users.map((item, i) => (
        <li key={i}>{item.email}</li>
      ))}
    </ul>
  );
};

export default observer(Users);
