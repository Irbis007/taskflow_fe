import { SearchInput } from "@shared/ui";
import { getInitials } from "@shared/utils";
import { useEffect, useState } from "react";
import { TbUserPlus } from "react-icons/tb";
import { $userHooks } from "@entities/user/api";
import { useNavigate, useParams } from "react-router-dom";
import { URLS } from "@shared/consts";

const filterBtns = ["All", "Admin", "Member"] as const;

export function UsersList() {
  const userId = useParams<{ id: string }>().id || "";
  const { data: users = [] } = $userHooks.getAll();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] =
    useState<(typeof filterBtns)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) => u.role === activeFilter || activeFilter === "All",
  );

  useEffect(() => {
    if (users.length) navigate(users[0].id);
  }, [users, navigate]);

  return (
    <div className="shrink-0 w-80 h-full border-r border-default">
      <div className="flex items-center justify-between py-6 px-4 border-b border-default text-lg font-bold">
        <span>Team - 8</span>
        <button className="flex gap-2 items-center px-2 py-1 rounded-md bg-accent text-sm font-normal cursor-pointer transition-colors duration-300 hover:bg-accent/60">
          <TbUserPlus size={16} /> Invite
        </button>
      </div>
      <div className="p-3 border-b border-default">
        <SearchInput value={search} onChange={setSearch} />
      </div>
      <div className="flex gap-2 items-center p-3 border-b border-default text-sm">
        {filterBtns.map((item) => (
          <button
            onClick={() => setActiveFilter(item)}
            className={`p-1 px-4 rounded-md cursor-pointer ${activeFilter === item ? "bg-accent/20 text-accent" : ""}`}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="">
        <div className="p-2 text-secondary text-sm tracking-widest uppercase">
          channels
        </div>
        <div className="mt-1">
          {filteredUsers.map((item) => {
            const initials = getInitials(item);
            const name = `${item.name} ${item.surname.charAt(1).toLowerCase()}`;
            return (
              <div
                key={item.id}
                onClick={() => navigate(`${URLS.users}/${item.id}`)}
                className={`flex p-2 items-center gap-2 w-full hover:bg-accent/10 cursor-pointer border-l-4 
                ${userId === item.id ? "bg-accent/10 border-accent" : "border-transparent "}`}
              >
                <div className="w-11 h-11 shrink-0 flex justify-center items-center rounded-full bg-success/20 text-lg text-success">
                  {initials}
                </div>
                <div className="w-full overflow-hidden">
                  <div className="flex justify-between">
                    <div className=" text-sm">{name}</div>
                  </div>
                  <div className="w-full truncate text-sm text-secondary">
                    {item.email}
                  </div>
                </div>
                <div
                  className={`px-1 rounded-sm text-sm ${item.role === "Admin" ? "bg-accent/20 text-accent" : "bg-elevated text-secondary"}`}
                >
                  {item.role}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
