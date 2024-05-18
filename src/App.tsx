import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
const App: FC = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
