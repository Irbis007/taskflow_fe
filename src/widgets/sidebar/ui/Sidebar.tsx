import { URLS } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { getInitials } from "@shared/utils";
import { AiOutlineHome } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaRegFolder } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLayoutKanban } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";

export function Sidebar() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col shrink-0 w-3xs bg-surface border-r border-default">
      <Link to={"/"} className="flex items-center gap-5 ml-2 p-3">
        <LuLayoutDashboard className="text-accent" size={24} />
        <div className="text-2xl font-bold">Taskflow</div>
      </Link>
      <div className="mt-2 grow p-3">
        <div className="mt-5">
          <div className="pl-3 text-muted uppercase tracking-wider">main</div>
          <div className="space-y-1 mt-1">
            <NavLink
              to={URLS.home}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <AiOutlineHome size={24} />
              <div className="">Home</div>
            </NavLink>
            <NavLink
              to={URLS.kanban}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <TbLayoutKanban size={24} />
              <div className="">Kanban</div>
            </NavLink>
            <NavLink
              to={URLS.chat}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <BsChat size={24} />
              <div className="">Chat</div>
            </NavLink>
          </div>
        </div>
        <div className="mt-5">
          <div className="pl-3 text-muted uppercase tracking-wider">manage</div>
          <div className="space-y-1 mt-1">
            <NavLink
              to={URLS.users}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <FiUsers size={24} />
              <div className="">Users</div>
            </NavLink>
            <NavLink
              to={URLS.projects.default}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <FaRegFolder size={24} />
              <div className="">Projects</div>
            </NavLink>
            <NavLink
              to={URLS.settings.default}
              className={({ isActive }) =>
                `w-full flex gap-4 items-center p-3 rounded-lg hover:bg-elevated hover:text-secondary ${isActive && "bg-accent/30 text-accent"}`
              }
            >
              <IoSettingsOutline size={24} />
              <div className="">Settings</div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-default pt-4 pb-8 px-3">
        <div onClick={() => clearAuth()} className="flex gap-2">
          <div className="content-center text-accent w-12 h-12 rounded-full bg-accent/30">
            {!!user && getInitials(user)}
          </div>
          <div>
            <div className="text-primary">
              {user?.name} {user?.surname}
            </div>
            <div className="text-secondary">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
