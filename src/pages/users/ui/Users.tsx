import { UsersList } from "./UsersList";
import { Outlet } from "react-router-dom";

export interface User {
  id: number;
  role: "Admin" | "Member";
  name: string;
  surname: string;
  email: string;
}

export function Users() {
  return (
    <div className="flex w-full h-full">
      <UsersList />
      <Outlet />
    </div>
  );
}
