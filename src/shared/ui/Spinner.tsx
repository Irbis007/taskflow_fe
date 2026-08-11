import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  containerClassName?: string;
  size?: number;
  center?: boolean;
};

export function Spinner({
  className,
  containerClassName,
  center,
  size = 20,
}: Props) {
  return (
    <div
      className={twMerge(
        `w-max ${center ? "flex items-center justify-center w-full h-full" : ""}`,
        containerClassName,
      )}
    >
      <div className={twMerge("animate-spin", className)}>
        <AiOutlineLoading3Quarters size={size} />
      </div>
    </div>
  );
}
