import { useRef } from "react";
import { CardWrapper, Overview } from "./wrappers";
import { useClickOutside } from "@shared/libs";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";

type Props = {
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  options: {
    label: string;
    onClick: () => void;
    className?: string;
    disableCloseByCLick?: boolean;
    isLoading?: boolean
    disabled?: boolean
  }[];
};

export function DropdownMenu({ isActive, options, setIsActive }: Props) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => setIsActive(false));
  return (
    <div className="dropdown">
      {isActive && <Overview transparent />}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-min min-w-40 z-100"
        ref={menuRef}
      >
        <div
          className={`grid overflow-hidden transition-[grid-template-rows] ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0">
            <CardWrapper className="p-0">
              {options.map((item, i) => (
                <button
                  key={i}
                  disabled={item?.disabled}
                  onClick={() => {
                    item.onClick();
                    if (!item?.disableCloseByCLick) setIsActive(false);
                  }}
                  className={twMerge(
                    `flex items-center gap-2 w-full text-primary bg-elevated disabled:bg-surface transition-colors
                     [&:hover:not(:disabled)]:bg-surface p-3 ${i !== 0 ? "border-t border-default" : ""}
                     [&:hover:not(:disabled)]:text-accent cursor-pointer disabled:cursor-not-allowed`,
                    item?.className,
                  )}
                >
                  {item.label} {item?.isLoading && <Spinner/>}
                </button>
              ))}
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
