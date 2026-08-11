import { Sidebar } from "@widgets/sidebar";
import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div className="flex bg-base w-full h-screen text-primary">
      <Sidebar />
      <div className="flex flex-col grow">
        <Outlet />
      </div>
    </div>
  );
};
