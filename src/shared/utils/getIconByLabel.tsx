import type { ProjectIcon } from "@shared/models";
import { BiBarChartAlt2 } from "react-icons/bi";
import { GoMail, GoShieldLock } from "react-icons/go";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoCartOutline, IoColorPaletteOutline, IoDocumentTextOutline, IoRocketOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbApi, TbBrandGithub, TbServer } from "react-icons/tb";

export function getIconByLabel(label: ProjectIcon, size = 20) {
  switch (label) {
    case "phone":
      return <IoIosPhonePortrait size={size} />;
    case "dashboard":
      return <LuLayoutDashboard size={size} />;
    case "api":
      return <TbApi size={size} />;
    case "security":
      return <GoShieldLock size={size} />;
    case "server":
      return <TbServer size={size} />;
    case "docs":
      return <IoDocumentTextOutline size={size} />;
    case "paint":
      return <IoColorPaletteOutline size={size} />;
    case "chart":
      return <BiBarChartAlt2 size={size} />;
    case "cart":
      return <IoCartOutline size={size} />;
    case "github":
      return <TbBrandGithub size={size} />;
    case "mail":
      return <GoMail size={size} />;
    case "rocket":
      return <IoRocketOutline size={size} />;
    default:
      return <IoIosPhonePortrait size={size} />;
  }
}