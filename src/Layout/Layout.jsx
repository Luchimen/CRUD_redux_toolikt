import { Outlet } from "react-router-dom";
import { Header } from "../components";

export const Layout = () => {

  return (
    <>
      <Header />
      <div className="mt-10 flex">
        <div className="w-4/5 m-auto xl:w-3/5">
          <Outlet />
        </div>
      </div>
    </>
  );
};
