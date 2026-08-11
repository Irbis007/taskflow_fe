import { CardWrapper } from "@shared/ui";
import { UserAvatar } from "../../../entities";

const activity = [
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
  {
    author: {
      name: "Kontantin",
      surname: "Shushkodomov",
    },
    lastChangesTime: "1 min ago",
    action: "Moved",
    taskName: "Task Name",
    projectName: "Project 1",
  },
];

export function LastActivity() {
  return (
    <CardWrapper className="flex-1/2 min-w-100">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Last activity</div>
      </div>
      <div className="mt-4">
        {activity.map((item, i) => (
          <div key={i} className={`flex gap-3 py-3 ${i > 0 && 'border-t border-default'}`}>
            <UserAvatar user={item.author} />
            <div className="flex gap-1 grow">
              <span>{item.action}</span>
              <span className="font-bold">
                {item.taskName}
                <span className="font-normal">.</span>
              </span>
              <span className="text-secondary">{item.projectName}</span>
            </div>
            <span className="text-muted">{item.lastChangesTime}</span>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
