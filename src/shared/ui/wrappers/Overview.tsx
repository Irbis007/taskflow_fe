import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Overview({ children, className }: Props) {
  return (
    <div
      className={twMerge(
        "fixed inset-0 w-full h-screen bg-black/20 z-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
