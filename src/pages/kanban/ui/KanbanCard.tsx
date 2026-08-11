import { UserAvatar } from "@entities";
import { URLS } from "@shared/consts";
import type { KanbanTask } from "@shared/models";
import { getPriorityColor } from "@shared/utils";
import dayjs from "dayjs";
import { BsThreeDots } from "react-icons/bs";
import { LuCalendar } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export function KanbanCard({
  title,
  priority,
  deadline,
  tags,
  id,
  //TODO: create progress bar for subtasks
  author,
  totalSubtasks,
  completedSubtasks,
}: KanbanTask) {
  // const userInitials = getInitials(author.name, author.surname);
  const navigate = useNavigate();
  const priorityColor = getPriorityColor(priority);
  const progressBarW = (completedSubtasks * 100) / totalSubtasks;
  return (
    <div
      className="px-3 py-2 border border-default bg-surface hover:border-accent
     cursor-pointer rounded-xl transition-colors duration-300"
      onClick={() => navigate(`${URLS.task.default}/${id}`)}
    >
      <div className="flex justify-between items-center">
        <div
          style={{
            background: `rgb(var(--${priorityColor}-rgb) / .2)`,
            color: `var(--color-${priorityColor})`,
          }}
          className={`rounded-md h-max text-xs px-2 py-0.5`}
        >
          {priority}
        </div>
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 
          text-muted hover:text-accent hover:bg-accent/20"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <BsThreeDots size={24} />
        </div>
      </div>
      <div className="text-primary text-lg font-bold text-wrap">{title}</div>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags?.map((item) => (
          <div
            key={item.id}
            className="bg-elevated text-muted text-sm px-2 rounded-md"
          >
            {item.name}
          </div>
        ))}
      </div>
      {!!totalSubtasks && (
        <div className="mt-2">
          <div className="flex justify-between text-sm text-muted">
            <span>Progress</span>
            <span>
              {completedSubtasks}/{totalSubtasks} tasks
            </span>
          </div>
          <div className="relative w-full h-1  mt-1 rounded-lg bg-muted">
            <div
              style={{
                width: progressBarW + "%",
              }}
              className="absolute top-0 left-0 h-1 rounded-l bg-accent"
            ></div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center mt-3 text-muted">
        <div className="flex gap-2 items-center text-muted">
          {!!deadline && (
            <>
              <LuCalendar />
              <div className="text-sm">{dayjs(deadline).format("MMM DD")}</div>
            </>
          )}
        </div>
        <UserAvatar user={author} />
      </div>
    </div>
  );
}
