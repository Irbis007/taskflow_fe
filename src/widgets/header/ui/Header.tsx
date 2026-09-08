import { URLS } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { getInitials } from "@shared/utils";
import { AiOutlineBell } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation()
  const pathsArr = location.pathname.split('/')
  const lastPath = pathsArr[pathsArr.length - 1]
  const title = lastPath.charAt(0).toLocaleUpperCase() + lastPath.slice(1, lastPath.length)
  const user = useAuthStore(state => state.user)
  return (
    <div className="flex items-center bg-surface w-full py-3 px-5 border-b border-default">
      <div className="grow text-2xl font-bold text-primary">{!title ? "Dashboard" : title}</div>
      <div className="flex gap-3">
        <div className="content-center h-12 w-12 rounded-xl bg-elevated border border-default text-secondary cursor-pointer transition-colors hover:border-secondary hover:text-primary">
          <IoIosSearch size={24}/>
        </div>
        <div className="content-center h-12 w-12 rounded-xl bg-elevated border border-default text-secondary cursor-pointer transition-colors hover:border-secondary hover:text-primary">
          <AiOutlineBell size={24}/>
        </div>
        <Link to={URLS.profile} className="content-center h-12 w-12 rounded-full bg-accent/40 text-accent">
          {!!user && getInitials(user)}
        </Link>
      </div>
    </div>
  );
}
