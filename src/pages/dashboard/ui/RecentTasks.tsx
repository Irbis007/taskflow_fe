import { URLS } from "@shared/consts";
import type { TaskPriority } from "@shared/models";
import { CardWrapper } from "@shared/ui";
import { getPriorityColor } from "@shared/utils";
import { Link } from "react-router-dom";

const recentTasks: {
  priority: TaskPriority;
  taskName: string;
}[] = [
  {
    priority: "Hight",
    taskName: "Some task title",
  },
  {
    priority: "Medium",
    taskName: "Some task title",
  },
  {
    priority: "Low",
    taskName: "Some task title",
  },
  {
    priority: "Low",
    taskName: "Some task title",
  },
  {
    priority: "Hight",
    taskName: "Some task title",
  },
  {
    priority: "Medium",
    taskName: "Some task title",
  },
];

export function RecentTasks() {
  return (
    <CardWrapper className="flex-1/2">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Recent tasks</div>
        <Link to={URLS.kanban} className="link">
          Open kanban
        </Link>
      </div>
      <div className="mt-4">
        {recentTasks.map((item, i) => {
          const priorityColor = getPriorityColor(item.priority);
          return (
            <div key={i} className={`flex gap-2 items-center py-3 ${i > 0 && 'border-t border-default'}`}>
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: `rgb(var(--${priorityColor}-rgb))`,
                }}
              ></div>
              <span className="grow">{item.taskName}</span>
              <div
                className="px-3 rounded-xl"
                style={{
                  background: `rgb(var(--${priorityColor}-rgb) / .2)`,
                  color: `rgb(var(--${priorityColor}-rgb))`
                }}
              >
                {item.priority}
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}
