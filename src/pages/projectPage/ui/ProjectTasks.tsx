import { UserAvatar } from "@entities";
import { $taskHooks } from "@entities/task";
import { URLS } from "@shared/consts";
import type { KanbanTask } from "@shared/models";
import { CardWrapper, Checkbox, Spinner } from "@shared/ui";
import { getPriorityColor } from "@shared/utils";
import { Link, useParams } from "react-router-dom";

type Props = {
  totalTasks: number;
  setOpenCreateTask: (val: boolean) => void;
};
export function ProjectTasks({ totalTasks, setOpenCreateTask }: Props) {
  const id = useParams<{ id: string }>().id || "";
  const { data: tasks = [], isLoading } = $taskHooks.getTasks({ project: id });
  return (
    <CardWrapper className="p-4 overflow-auto">
      <div className="flex justify-between">
        <div className="text-lg">All tasks - {totalTasks}</div>
        <div className="link" onClick={() => setOpenCreateTask(true)}>
          + Add task
        </div>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner size={28} />
          </div>
        ) : (
          tasks.map((item, i) => {
            return <TaskRow task={item} idx={i} key={item.id} />;
          })
        )}
      </div>
    </CardWrapper>
  );
}

// TODO: Create component for TaskRow

const TaskRow = ({ task, idx }: { task: KanbanTask; idx: number }) => {
  const { updateIsComplete, isPending } = $taskHooks.partialUpdate(task.id);
  const isChecked = task.status === "Done";
  const priorityColor = getPriorityColor(task.priority);

  return (
    <div
      className={`flex gap-2 items-center py-4 border-t ${idx > 0 ? "border-default" : "border-transparent"}`}
    >
      <Checkbox isChecked={isChecked} onChange={updateIsComplete} />
      <div className={`grow ${isChecked ? "line-through text-muted" : ""}`}>
        <Link to={`${URLS.task.default}/${task.id}`} className="hover:text-accent underline">{task.title}</Link>
      </div>
      {isPending && <Spinner />}
      <div
        style={{
          background: `rgb(var(--${priorityColor}-rgb) / .2)`,
          color: `rgb(var(--${priorityColor}-rgb))`,
        }}
        className={"px-3 rounded-md text-sm"}
      >
        {task.priority}
      </div>
      <UserAvatar user={task.author} />
      <div className="text-sm text-muted">{task.deadline}</div>
    </div>
  );
};
