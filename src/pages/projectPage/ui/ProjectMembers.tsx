import { UserAvatar } from "@entities";
import { $projectHooks } from "@entities/project";
import { CardWrapper, Spinner } from "@shared/ui";
import { useParams } from "react-router-dom";

export function ProjectMembers() {
  const id = useParams<{ id: string }>().id || "";
  const { data: members = [], isLoading } = $projectHooks.getMembers(id);
  return (
    <CardWrapper className="p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg flex items-center gap-2">
          <span>Members</span> -{" "}
          {isLoading ? <Spinner /> : <span>{members.length}</span>}
        </div>
        <div className="link">+ Invite</div>
      </div>
      <div className="mt-2">
        {!isLoading ? (
          members.map((item, i) => {
            const name = `${item.name} ${item.surname.charAt(0)}.`;
            return (
              <div
                className={`flex items-center gap-4 py-3 border-t hover:bg-elevated cursor-pointer ${i > 0 ? "border-default" : "border-transparent"}`}
                key={i}
              >
                <UserAvatar user={item} size="medium" />
                <div className="grow">
                  <div className="">{name}</div>
                  <div className="text-sm text-muted">
                    <span>{item.email}</span> - <span></span>
                  </div>
                </div>
                <div
                // className={`px-2 rounded-sm text-sm ${item.role === "Lead" ? "text-accent bg-accent/20" : "text-muted bg-elevated"} `}
              >
                {item.role}
              </div>
                <div className="text-sm text-muted">{item.assignedTasks} tasks</div>
              </div>
            );
          })
        ) : (
          <Spinner size={32} center />
        )}
      </div>
    </CardWrapper>
  );
}
