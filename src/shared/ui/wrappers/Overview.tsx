import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
  transparent?: boolean
};

export function Overview({ children, className, transparent }: Props) {
  return (
    <div
      className={twMerge(
        `fixed inset-0 w-full h-screen ${!transparent && "bg-black/20"} z-100`,
        className,
      )}
    >
      {children}
    </div>
  );
}
