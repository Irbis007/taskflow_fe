import { URLS } from "@shared/consts";
import { FaRegBuilding, FaRegUser } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { GoAlert } from "react-icons/go";
import { IoShieldOutline } from "react-icons/io5";
import { MdOutlineColorLens } from "react-icons/md";
import { PiPlugBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";

export function SettingsSidebar() {
  return (
    <div className="text-secondary w-50 border-r border-default pt-8">
      <div className="pl-4 tracking-widest uppercase text-muted">Account</div>
      <div className="*:flex *:gap-2 *:items-center *:pl-4 *:py-2 *:hover:text-primary *:hover:bg-surface *:cursor-pointer *:border-l-4">
        <NavLink
          to={URLS.settings.staticParams.profile}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <FaRegUser />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to={URLS.settings.staticParams.security}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <IoShieldOutline />
          <span>Security</span>
        </NavLink>
        <NavLink
          to={URLS.settings.staticParams.notification}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <FiBell />
          <span>Notification</span>
        </NavLink>
      </div>
      <div className="pl-4 tracking-widest uppercase text-muted mt-4">Workspace</div>
      <div className="*:flex *:gap-2 *:items-center *:pl-4 *:py-2 *:hover:text-primary *:hover:bg-surface *:cursor-pointer *:border-l-4">
        <NavLink
          to={URLS.settings.staticParams.appearance}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <MdOutlineColorLens />
          <span>Appearance</span>
        </NavLink>
        <NavLink
          to={URLS.settings.staticParams.workspace}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <FaRegBuilding />
          <span>Workspace</span>
        </NavLink>
        <NavLink
          to={URLS.settings.staticParams.integration}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20 text-accent" : "border-transparent"
          }
        >
          <PiPlugBold />
          <span>Integration</span>
        </NavLink>
      </div>
      <div className="pl-4 tracking-widest uppercase text-muted mt-4">Workspace</div>
      <div className="*:flex *:gap-2 *:items-center *:pl-4 *:py-2 *:hover:bg-surface *:cursor-pointer *:border-l-4 *:text-red-400">
        <NavLink
          to={URLS.settings.staticParams.dangerZone}
          className={({ isActive }) =>
            isActive ? "border-accent bg-accent/20" : "border-transparent"
          }
        >
          <GoAlert />
          <span>Danger zone</span>
        </NavLink>
      </div>
    </div>
  );
}
