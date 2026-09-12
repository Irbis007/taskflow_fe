import { $api } from "@shared/api";
import { URLS } from "@shared/consts";
import { useAuthStore } from "@shared/models";
import { CardWrapper, SearchInput } from "@shared/ui";
import { getInitials } from "@shared/utils";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";
export function Header() {
  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 300);
  const { data, isLoading, isPending } = $api.useQuery("get", "/api/search", {
    params: {
      query: {
        search: searchDebounce,
      },
    },
  });
  const location = useLocation();
  const pathsArr = location.pathname.split("/");
  const lastPath = pathsArr[pathsArr.length - 1];
  const title =
    lastPath.charAt(0).toLocaleUpperCase() + lastPath.slice(1, lastPath.length);
  const user = useAuthStore((state) => state.user);
  const [isFocus, setIsFocus] = useState(false)

  return (
    <div className="flex items-center bg-surface w-full py-3 px-5 border-b border-default">
      <div className="grow text-2xl font-bold text-primary">
        {!title ? "Dashboard" : title}
      </div>
      <div className="flex gap-3">
        <div className="relative h-full">
          <SearchInput value={search} onChange={setSearch} setFocus={setIsFocus} isLoading={isLoading || isPending}/>
          {searchDebounce && data && isFocus && (
            <CardWrapper className="absolute z-100 top-14 w-full p-0">
              {!!data.tasks.length && (
                <div className="">
                  <div className="text-sm text-secondary p-2">Tasks</div>
                  {data.tasks.map((item, i) => (
                    <div
                      className={`p-2 px-3 cursor-pointer hover:bg-elevated ${i > 0 && "border-t border-default"}`}
                      key={item.id}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
              {!!data.projects.length && (
                <div className="mt-2">
                  <div className="text-sm text-secondary p-2">Projects</div>
                  {data.projects.map((item, i) => (
                    <div
                      className={`p-2 px-3 cursor-pointer hover:bg-elevated ${i > 0 && "border-t border-default"}`}
                      key={item.id}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
              {!data.projects.length && !data.tasks.length && (
                <div className="p-2 py-4 text-secondary">
                  There is no data match with {searchDebounce}
                </div>
              )}
            </CardWrapper>
          )}
        </div>

        <div className="content-center h-12 w-12 rounded-xl bg-elevated border border-default text-secondary cursor-pointer transition-colors hover:border-secondary hover:text-primary">
          <AiOutlineBell size={24} />
        </div>
        <Link
          to={URLS.profile}
          className="content-center h-12 w-12 rounded-full bg-accent/40 text-accent"
        >
          {!!user && getInitials(user)}
        </Link>
      </div>
    </div>
  );
}
