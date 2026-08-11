import { UserAvatar } from "@entities/user";
import { Comment as CommentType } from "@shared/models";
import dayjs from "dayjs";

type Props = {
  comment: CommentType;
  onDelete: () => Promise<unknown>;
  onUpdate: (message: string) => Promise<unknown>;
  loading?: boolean;
  disabled?: boolean;
};

export const Comment = ({
  comment,
  // onDelete,
  // onUpdate,
  // loading,
  // disabled,
}: Props) => {
  const { author, message, isEdited, updatedAt, createdAt } = comment;

  const date = isEdited ? updatedAt : createdAt;

  return (
    <div className="flex gap-2">
      <UserAvatar user={author} size="medium" className="shrink-0" />
      <div className="space-y-2">
        <div className="text-sm">
          <span>
            {author.name} {author.surname.charAt(0)}.
          </span>
          <span className="ml-2 text-secondary">
            {isEdited && "edited"} {dayjs(date).format("MMMM DD, YYYY HH:mm")}
          </span>
        </div>
        <div className="">{message}</div>
      </div>
    </div>
  );
};
