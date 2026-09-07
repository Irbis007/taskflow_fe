import { useSocketMessages } from "@shared/libs";
import { Sidebar } from "@widgets/sidebar";
import { Outlet } from "react-router-dom";

export const LayoutWithSidebar = () => {
  useSocketMessages()
  return (
    <div className="flex bg-base w-full h-screen text-primary">
      <Sidebar />
      <div className="flex flex-col grow">
        <Outlet />
      </div>
    </div>
  );
};
