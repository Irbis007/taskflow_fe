import { useClickOutside } from "@shared/libs";
import { ReactNode, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type Props = {
  title: ReactNode;
  selected?: string;
  label?: string;
  required?: boolean;
  withoutArrow?: boolean;
  titleClassName?: string;
  selectWidth?: string;
  selectPosition?:
    | "left"
    | "right"
    | "bottom"
    | "top"
    | "horizontal-center"
    | "vertical-center"
    | "center";
} & (
  | {
      onChange?: undefined;
      options: {
        label: ReactNode;
        onChange: () => void;
      }[];
    }
  | {
      onChange: (val: string) => void;
      options: {
        label: string;
        onChange?: undefined;
      }[];
    }
);

export function Select({
  title,
  options,
  label,
  required,
  selected,
  onChange,
  withoutArrow,
  titleClassName,
  selectWidth,
  selectPosition,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const positionClasses =
    selectPosition === "left"
      ? "right-0"
      : selectPosition === "horizontal-center"
        ? "right-1/2 translate-x-1/2"
        : "left-0";
  return (
    <div className="relative w-max" ref={containerRef}>
      {!!label && (
        <div onClick={() => setIsOpen(true)} className="mb-1 text-primary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </div>
      )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={twMerge(
          `flex items-center justify-between gap-4 px-4 py-2 border border-default rounded-lg min-w-40 cursor-pointer
           bg-elevated ${!selected ? "text-muted" : "text-primary"}`,
          titleClassName,
        )}
      >
        {title}
        {!withoutArrow && <IoIosArrowDown />}
      </div>
      <div
        className={twMerge(
          `absolute  ${label ? "top-20" : "top-12"} grid w-full transition-all z-100 
          ${selectWidth}  ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
          positionClasses,
        )}
      >
        <div
          className={`min-h-0 overflow-hidden bg-elevated rounded-lg ${isOpen && "py-1 border border-default"}`}
        >
          {options.map((item, i) => (
            <div
              onClick={() => {
                setIsOpen(false);
                if (item.onChange) {
                  item.onChange();
                } else {
                  onChange?.(item.label);
                }
              }}
              className={`py-2 px-4 hover:bg-surface cursor-pointer ${i > 0 && "border-t border-default"}`}
              key={i}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
