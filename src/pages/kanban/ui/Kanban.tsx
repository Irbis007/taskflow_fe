import { KanbanTask, TaskStatus, useAuthStore } from "@shared/models";
import { getStatusColor } from "@shared/utils";
import { useState, type ReactNode } from "react";
import { TiEqualsOutline } from "react-icons/ti";
import { KanbanCard } from "./KanbanCard";
import { FaRegUser } from "react-icons/fa";
import { PiWarningCircleLight } from "react-icons/pi";
import { $taskHooks } from "@entities/task";
import { CreateTaskForm } from "@features/create-task";
import { Spinner } from "@shared/ui";

type Filter = "All" | "Hight priority" | "Assigned to me";

const filterButtons: {
  title: Filter;
  icon: ReactNode;
}[] = [
  {
    title: "All",
    icon: <TiEqualsOutline size={20} />,
  },
  {
    title: "Hight priority",
    icon: <FaRegUser size={20} />,
  },
  {
    title: "Assigned to me",

    icon: <PiWarningCircleLight size={20} />,
  },
];
export function Kanban() {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("All");
  const user = useAuthStore((state) => state.user);

  const {
    data: tasks = [],
    isPending,
    isLoading,
  } = $taskHooks.getTasks({
    priority: selectedFilter === "Hight priority" ? "Hight" : undefined,
    assignees: selectedFilter === "Assigned to me" ? user?.id : undefined,
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const tasksByStatus: Record<TaskStatus, KanbanTask[]> = {
    Backlog: [],
    "To Do": [],
    "In progress": [],
    Review: [],
    Done: [],
  };

  tasks.forEach((task) => {
    tasksByStatus[task.status].push(task);
  });

  const loading = isLoading || isPending;

  return (
    <div className="overflow-hidden flex flex-col h-full">
      <div className="flex py-4 px-6 border-b border-default">
        <div className="flex gap-4">
          {filterButtons.map((item, i) => (
            <div
              key={i}
              className={`flex gap-2 items-center border p-2 cursor-pointer rounded-lg hover:bg-accent/10 hover:text-accent/70 hover:border-accent/70 transition-colors duration-300 ${selectedFilter === item.title ? "border-accent bg-accent/20 text-accent" : "bg-elevated border-default text-secondary"}`}
              onClick={() => setSelectedFilter(item.title)}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center grow justify-end">
          <div className="border-l border-muted pl-2 h-8"></div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="text-primary bg-accent p-2 rounded-lg cursor-pointer transition duration-300 hover:bg-accent/80"
          >
            + Add task
          </button>
        </div>
      </div>
      <div className="relative overflow-auto h-full px-4 py-6">
        <div className="flex gap-4">
          {Object.entries(tasksByStatus).map(([status, tasks], i) => {
            const statusColor = getStatusColor(status as TaskStatus, "bg");
            return (
              <div className="space-y-4 shrink-0 flex-[320px]" key={i}>
                <div className="flex items-center gap-2 p-3 bg-surface border-default border rounded-xl">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${statusColor}`}
                  ></div>
                  <div className="flex-1">{status}</div>
                  <div className="flex items-center justify-center w-5 h-5 rounded-sm bg-elevated text-sm text-muted text-center">
                    {loading ? <Spinner size={12} /> : tasks.length}
                  </div>
                </div>
                {!loading &&
                  tasks.map((item) => <KanbanCard key={item.id} {...item} />)}
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="flex items-center justify-center w-full h-full sticky top-0 left-0">
            <Spinner size={32} />
          </div>
        )}
      </div>
      <CreateTaskForm
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
    </div>
  );
}
