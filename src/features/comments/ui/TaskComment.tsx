import { Comment } from "@entities/comment";
import { Comment as CommentType } from "@shared/models";

type Props = {
  comment: CommentType;
};

export const TaskComment = ({ comment }: Props) => {

  return (
    <Comment
      comment={comment}
      onUpdate={() => Promise.any("s")}
      onDelete={() => Promise.any("s")}
      
    />
  );
};
