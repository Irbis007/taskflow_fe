import { Outlet } from "react-router-dom";
import { SettingsSidebar } from "./SettingsSidebar";

export function Settings() {
  return (
    <div className="flex w-full">
      <SettingsSidebar />
      <div className="p-6 grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
