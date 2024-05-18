import { FC, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Layout: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <div>
      <Navbar />
      {store.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>
            {store.isAuth
              ? `User ${store.user.email} in system`
              : "Not in system"}
          </h1>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default observer(Layout);
