import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";

type Props = {
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
} & (
  | {
      title: string;
      onlyIcon?: undefined;
    }
  | {
      title?: undefined;
      onlyIcon: boolean;
    }
);

export function Button({
  title,
  onClick,
  className,
  isLoading,
  disabled,
  icon,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex items-center justify-center h-10 min-w-32 gap-2 py-2 px-4 rounded-lg bg-accent text-white text-lg cursor-pointer transition-colors duration-300 hover:bg-accent/80 disabled:bg-accent/60 disabled:cursor-not-allowed",
        className,
      )}
      disabled={isLoading || disabled}
    >
      {!isLoading ? (
        <>
          {icon} {!!title && <span>{title}</span>}
        </>
      ) : (
        <Spinner />
      )}
    </button>
  );
}
