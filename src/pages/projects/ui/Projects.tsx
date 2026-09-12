import { SearchInput, Spinner } from "@shared/ui";
import { useState, type ReactNode } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { LuArchive } from "react-icons/lu";
import { TiEqualsOutline } from "react-icons/ti";
import { BoardView } from "./BoardView";
import { ListView } from "./ListView";
import { $projectHooks } from "@entities/project";
import { CreateProjectForm } from "@widgets/forms/project-form";
import { ProjectStatus } from "@shared/models";
import { useDebounce } from "use-debounce";

type Filter = "All" | ProjectStatus;

const filterButtons: {
  title: Filter;
  icon: ReactNode;
}[] = [
  {
    title: "All",
    icon: <TiEqualsOutline size={20} />,
  },
  {
    title: "Active",
    icon: <BiCheckCircle size={20} />,
  },
  {
    title: "Done",
    icon: <LuArchive size={20} />,
  },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | "All">(
    "All",
  );

  const [search, setSearch] = useState("");
  const [searchDebounce] = useDebounce(search, 300)
  const { data: projects = [], isLoading, isPending } = $projectHooks.getAll({
    status: activeFilter !== "All" ? activeFilter : undefined,
    search: searchDebounce,
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<"board" | "list">("board");

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="flex p-4 border-b border-default bg-surface items-center">
        <div className="text-xl font-bold">Projects</div>
        <div className="px-3 py-1 rounded-3xl bg-elevated ml-2">{projects.length} total</div>
        <div className="ml-auto flex gap-2">
          <div className="bg-elevated p-2 text-secondary border border-default rounded-lg hover:bg-surface cursor-pointer">
            <AiOutlineBell size={20} />
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-accent px-4 rounded-lg hover:bg-accent/80 cursor-pointer"
          >
            + New project
          </button>
        </div>
      </div>
      <div className="flex p-4 border-b border-default items-center">
        <SearchInput value={search} onChange={setSearch} iconPos="left" />
        {filterButtons.map((item, i) => (
          <div
            className={`flex items-center gap-2 p-2 bg-elevated ml-3 border rounded-lg cursor-pointer ${activeFilter === item.title ? "text-accent border-accent bg-accent/20" : "text-secondary border-default bg-surface"}`}
            key={i}
            onClick={() => setActiveFilter(item.title)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}

        <div className="ml-auto p-1 flex gap-1 border border-default rounded-lg bg-surface">
          <div
            onClick={() => setActiveView("board")}
            className={`p-2 rounded-md cursor-pointer ${activeView === "board" ? "bg-elevated text-primary" : "bg-surface text-secondary"}`}
          >
            <IoGridOutline size={20} />
          </div>
          <div
            onClick={() => setActiveView("list")}
            className={`p-2 rounded-md cursor-pointer ${activeView === "list" ? "bg-elevated text-primary" : "bg-surface text-secondary"}`}
          >
            <FaList size={20} />
          </div>
        </div>
      </div>
      <div className="relative grow h-full overflow-auto">
        {isLoading || isPending ? (
          <div className="absolute inset-0 bg-base/20 flex justify-center items-center">
            <Spinner size={50} />
          </div>
        ) : activeView === "board" ? (
          <BoardView data={projects} />
        ) : (
          <ListView data={projects} />
        )}
      </div>

      <CreateProjectForm
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
    </div>
  );
}
