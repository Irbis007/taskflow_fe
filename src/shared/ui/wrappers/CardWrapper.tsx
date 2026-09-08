import type { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: ReactNode;
  className?: React.ComponentProps<"div">["className"];
  ref?: Ref<HTMLDivElement | null>;
  onClick?: () => void;
}

export const CardWrapper = ({ className, children, ...props }: Props) => {
  return (
    <div
      {...props}
      className={twMerge(
        `bg-surface p-3 border border-default rounded-xl overflow-hidden`,
        className,
      )}
    >
      {children}
    </div>
  );
};
