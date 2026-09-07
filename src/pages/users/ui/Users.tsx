import { UsersList } from "./UsersList";
import { Outlet, useParams } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

export interface User {
  id: number;
  role: "Admin" | "Member";
  name: string;
  surname: string;
  email: string;
}

export function Users() {
  const userId = useParams()?.id;
  return (
    <div className="flex w-full h-full">
      <UsersList />
      {userId ? (
        <Outlet />
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col gap-4 text-secondary">
          <AiOutlineUser size={120} />
          <span className="text-3xl">Select user</span>
        </div>
      )}
    </div>
  );
}
