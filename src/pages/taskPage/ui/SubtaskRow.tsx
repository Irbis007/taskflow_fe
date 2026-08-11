import { UserAvatar } from "@entities";
import { $taskHooks } from "@entities/task";
import { Subtask } from "@shared/models";
import { Checkbox, Spinner } from "@shared/ui";
import { getVarPending } from "../utils";
import { Link } from "react-router-dom";
import { URLS } from "@shared/consts";

type Props = {
  task: Subtask;
};

export function SubtaskRow({ task }: Props) {
  const { updateIsComplete, isPending, variables } = $taskHooks.partialUpdate(
    task.id,
  );

  const isCompletedPending = getVarPending(
    isPending,
    variables?.body?.isCompleted,
    task.isCompleted,
  );

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        size="medium"
        isChecked={task.isCompleted}
        onChange={(val) => updateIsComplete(val)}
      />
      <div
        className={`grow ${task.isCompleted ? "text-secondary line-through" : ""}`}
      >
        <Link
          to={`${URLS.task.default}/${task.id}`}
          className="hover:text-accent hover:underline cursor-pointer"
        >
          {task.title}
        </Link>
      </div>
      {!!isCompletedPending && <Spinner />}
      <UserAvatar user={task.author} />
    </div>
  );
}
