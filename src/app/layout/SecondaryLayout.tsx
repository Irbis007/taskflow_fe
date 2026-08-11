import { Header } from "@widgets/header";
import { Outlet } from "react-router-dom";

export const SecondaryLayout = () => {
  return (
    <div className="flex flex-col bg-base w-full h-screen text-primary">
      <Header/>
      <Outlet />
    </div>
  );
};
