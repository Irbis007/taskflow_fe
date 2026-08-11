import { $taskHooks } from "@entities/task";
import { URLS } from "@shared/consts";
import { KanbanTask, TaskStatus } from "@shared/models";
import { Spinner } from "@shared/ui";
import { useNavigate, useParams } from "react-router-dom";

const colorsByStatus = {
  Backlog: "bg-muted",
  "To Do": "bg-accent",
  "In progress": "bg-warning",
  Review: "bg-danger",
  Done: "bg-success",
};

function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];
}

export function ProjectBoard() {
  const id = useParams<{ id: string }>().id || "";
  const { data: tasks = [], isLoading } = $taskHooks.getTasks({ project: id });

  const boardData: Record<TaskStatus, KanbanTask[]> = tasks.reduce(
    (prev, cur) => {
      if (prev[cur.status]) {
        return { ...prev, [cur.status]: [...prev[cur.status], cur] };
      } else {
        return { ...prev, [cur.status]: [cur] };
      }
    },
    {} as Record<TaskStatus, KanbanTask[]>,
  );

  const navigate = useNavigate();

  return (
    <div className="flex gap-4">
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <Spinner size={32} />
        </div>
      ) : (
        typedEntries(boardData).map(([key, value]) => (
          <div className="bg-elevated py-2 px-3 flex-1/4 rounded-lg" key={key}>
            <div className="flex justify-between items-center">
              <div className="text-secondary text-sm">{key}</div>
              <div
                className={`w-2 h-2 rounded-full ${colorsByStatus[key]}`}
              ></div>
            </div>
            <div className="mt-2 space-y-2">
              {value.map((item) => (
                <div
                  className={`space-y-2 bg-surface p-2 rounded-lg border border-transparent cursor-pointer hover:border-accent
                    transition-colors duration-300`}
                  key={item.id}
                  onClick={() => navigate(`${URLS.task.default}/${item.id}`)}
                >
                  <div className="text-sm">{item.title}</div>
                  {!!item.tags.length && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {item.tags.map((item, j) => (
                        <div
                          className="px-2 rounded-sm bg-elevated w-max text-muted"
                          key={`cat-${j}`}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
