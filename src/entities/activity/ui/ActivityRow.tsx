import { UserAvatar } from "@entities/user";
import { Activity } from "@shared/models";
import { getRgbColor } from "@shared/utils";
import dayjs from "dayjs";
import { FaRegFolder, FaUserPlus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { IoArrowForward, IoCheckmark } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";

type Props = {
  activity: Activity;
  type?: "default" | "simple";
};

const getColorByActivity = (
  action: Activity["action"],
  entity: Activity["entityType"],
) => {
  switch (action) {
    case "commented":
      return "success";
    case "created":
      return entity === "Project" ? "warning" : "success";
    case "moved":
      return "warning";
    case "invited":
      return "purple";
    default:
      return "accent";
  }
};

const getIconByAction = (
  action: Activity["action"],
  entity: Activity["entityType"],
) => {
  switch (action) {
    case "completed":
      return <IoCheckmark />;
    case "created":
      return entity === "Project" ? <FaRegFolder /> : <GoPlus />;
    case "moved":
      return <IoArrowForward />;
    case "invited":
      return <FaUserPlus />;
    case "commented":
      return <LuMessageSquareText />;
    default:
      return <IoCheckmark />;
  }
};

export const ActivityRow = ({ activity, type = "default" }: Props) => {
  const {
    action,
    author,
    entityType,
    metadata,
    invitedUser,
    entityTitle,
    createdAt,
  } = activity;

  const icon = getIconByAction(action, entityType);
  const color = getColorByActivity(action, entityType);
  return (
    <div className="flex items-center gap-2">
      {type === "default" ? (
        <div
          style={{
            color: getRgbColor(color),
            background: getRgbColor(color, 0.2),
          }}
          className="p-2 rounded-lg w-max shrink-0"
        >
          {icon}
        </div>
      ) : (
        <UserAvatar user={author} />
      )}
      <div className="grow flex gap-2">
        {type === "default" && (
          <span className="font-500">
            {author.name} {author.surname.charAt(0)}.
          </span>
        )}

        <span className="text-muted">
          {action}
          {!!metadata?.from && metadata.from}
        </span>
        <span className="font-500">
          {invitedUser
            ? `${invitedUser.name} ${invitedUser.surname.charAt(0)}.`
            : entityTitle}
        </span>
        <span className="text-muted">{!!metadata?.to && metadata.to}</span>
      </div>
      <div className="text-sm text-muted">
        {dayjs(createdAt).format("MMMM DD YYYY, HH:mm")}
      </div>
    </div>
  );
};
