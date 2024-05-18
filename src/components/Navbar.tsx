import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "..";

const Navbar: FC = () => {
  const { store } = useContext(Context);
  return (
    <div>
      <Link to={"/"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      {store.isAuth && <Link to={"/users"}>Users</Link>}
      {store.isAuth && <button onClick={() => store.logout()}>Logout</button>}
    </div>
  );
};

export default Navbar;
