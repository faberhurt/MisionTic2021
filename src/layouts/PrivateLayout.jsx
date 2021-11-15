import Sidebar from "../components/Sidebar";
import React from "react";
import PrivateRoute from "../components/PrivateRoute";

const PrivateLayout = ({ children }) => {
  return (
    <PrivateRoute>
      <div className="flex w-screen h-screen ">
        <Sidebar />
        {/* flex w-full overflow-scroll items-center*/}

        <main className="flex flex-col w-full items-center justify-center overflow-y-scroll">
          {children}
        </main>
      </div>
    </PrivateRoute>
  );
};
export default PrivateLayout;
