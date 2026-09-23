import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import type { ComponentProps, ReactNode } from "react";

type Props = {
  title: string;
  onClick: ComponentProps<typeof Button>["onClick"];
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
};

export function OutlinedButton({
  title,
  onClick,
  className,
  isLoading,
  disabled,
  icon,
}: Props) {
  return (
    <Button
      title={title}
      onClick={onClick}
      className={twMerge(
        `bg-elevated border border-default disabled:bg-primary/20 hover:bg-surface`,
        className,
      )}
      disabled={isLoading || disabled}
      icon={icon}
    />
  );
}
