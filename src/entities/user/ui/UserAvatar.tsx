import type { User } from "@shared/models/types";
import { getInitials } from "@shared/utils";
import { twMerge } from "tailwind-merge";

interface Props {
  user: Pick<User, "name" | "surname">;
  size?: "small" | "medium" | "large";
  className?: string;
}

export function UserAvatar({ user, className, size = "small" }: Props) {
  const userInitials = getInitials(user.name, user.surname);

  return (
    <div
      className={twMerge(
        `flex items-center justify-center w-max p-1 rounded-full bg-warning/20 text-warning 
        ${size === "large" ? "w-20 h-20 text-2xl" : size === 'medium' ? "w-12 h-12" :  "text-xs "}`,
        className,
      )}
    >
      {userInitials}
    </div>
  );
}
