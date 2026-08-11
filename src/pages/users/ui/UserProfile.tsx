import { GoMail } from "react-icons/go";
import { LuMessageCircle } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { TbUserOff } from "react-icons/tb";
import { CardWrapper, Spinner } from "@shared/ui";
import { IoCheckmark } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { $userHooks } from "@entities/user/api";
import { ActivityRow } from "@entities/activity";
import { UserAvatar } from "@entities";

export function UserProfile() {
  const id = useParams().id || "";
  const { data: user, isLoading } = $userHooks.getOne(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Spinner size={32} />
      </div>
    );
  }
  if (!user) {
    return "No user";
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="bg-surface p-4 space-y-4 border-b border-default">
        <div className="flex gap-3 ">
          <UserAvatar user={user} size={"large"} />
          <div className="space-y-2">
            <div className="text-xl">
              {user.name} {user.surname}
            </div>
            <div className={"flex items-center gap-2"}>
              <div
                className={`w-max rounded-md px-2 ${user.role === "Admin" ? "bg-accent/20 text-accent" : "bg-elevated text-secondary"}`}
              >
                {user.role}
              </div>
              <div className="text-sm text-muted">since Jun 2024</div>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <GoMail />
              <span>{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 p-2 py-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80">
            <LuMessageCircle />
            <span>Message</span>
          </button>
          <button className="flex items-center gap-2 p-2 py-3 bg-elevated border border-default rounded-lg cursor-pointer hover:bg-surface">
            <FiEdit />
            <span>Edit profile</span>
          </button>
          <button className="flex items-center gap-2 p-2 py-3 bg-danger/20 border border-danger rounded-lg cursor-pointer hover:bg-danger/40">
            <TbUserOff />
            <span>Message</span>
          </button>
        </div>
        <div className="flex gap-2 *:flex-1/3">
          <div className="p-4 border bg-elevated border-default rounded-lg">
            <div className="text-2xl font-bold text-center">
              {user.tasksDone}
            </div>
            <div className="text-secondary text-center text-sm">Tasks done</div>
          </div>
          <div className="p-4 border bg-elevated border-default rounded-lg">
            <div className="text-2xl font-bold text-center">
              {user.projectsCount}
            </div>
            <div className="text-secondary text-center text-sm">Projects</div>
          </div>
          <div className="p-4 border bg-elevated border-default rounded-lg">
            <div className="text-2xl font-bold text-center">
              {user.completedTasksRate}%
            </div>
            <div className="text-secondary text-center text-sm">
              On time rate
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <div className="text-secondary text-lg">Personal info</div>
          <div className="link">Edit</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <PersonalInfoItem
            title="Full name"
            value={`${user.name} ${user.surname}`}
          />
          <PersonalInfoItem title="Role" value={user.roleTitle} />
          <PersonalInfoItem title="Location" value={user.location} />
          <PersonalInfoItem title="Timezone" value={user.timeZone} />
          <PersonalInfoItem title="Joined" value={user.joinedDate} />
          <PersonalInfoItem
            isTextGreen
            title="Last activity"
            value={user.joinedDate}
          />
        </div>
      </div>
      <div className="px-4 mt-2">
        <div className="text-secondary text-lg">Projects</div>
        <div className="mt-3 space-y-3">
          {!user.projects.length ? (
            <div className="text-muted">There is no projects</div>
          ) : (
            user.projects.map((item, i) => (
              <CardWrapper key={i} className="flex items-center gap-2">
                <div
                  style={{
                    background: `rgb(var(--${item.color}-rgb))`,
                  }}
                  className="w-2.5 h-2.5 rounded-full"
                ></div>
                <div className="title-lg grow">{item.name}</div>
                <div className="text-muted text-sm pr-4">
                  {item.projectRole}
                </div>
                <div className="flex items-center  gap-1 text-secondary text-sm">
                  <IoCheckmark /> {item.assignedTasks} Tasks
                </div>
              </CardWrapper>
            ))
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="text-lg text-secondary">Recent activity</div>
        <div className="mt-2 space-y-2">
          {user.lastActivities.map((item) => (
            <ActivityRow activity={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

const PersonalInfoItem = ({
  title,
  value,
  isTextGreen,
}: {
  title: string;
  value: string;
  isTextGreen?: boolean;
}) => {
  return (
    <CardWrapper className="w-full">
      <div className="text-sm text-muted">{title}</div>
      <div className={isTextGreen ? "text-success" : ""}>{value ?? "-"}</div>
    </CardWrapper>
  );
};
