import { useClickOutside } from "@shared/libs";
import type { ProjectStatus, Tuple } from "@shared/models";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type Props = {
  selected?: ProjectStatus;
  required?: boolean;
  containerClassName?: string;
  onChange: (val: ProjectStatus) => void;
};

const options: ProjectStatus[] = [
  "Active",
  "Planned",
] satisfies Tuple<ProjectStatus>;

export function ProjectStatusSelect({
  required,
  selected,
  onChange,
  containerClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const selectedStatus = options.find((op) => op === selected) || 'To Do';

  return (
    <div
      className={twMerge("relative w-max ", containerClassName)}
      ref={containerRef}
    >
      <div onClick={() => setIsOpen(true)} className="mb-1 text-primary">
        <span>Status</span>
        {required && <span className="ml-1 text-danger">*</span>}
      </div>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-4 px-4 py-2 border border-default rounded-lg min-w-40 cursor-pointer bg-elevated"
      >
        <span className={`${!selectedStatus ? "text-muted" : "text-primary"}`}>
          {selectedStatus}
        </span>
        <IoIosArrowDown />
      </div>
      <div
        className={`absolute top-20 left-0 grid w-full transition-all z-100 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`min-h-0 overflow-hidden bg-elevated rounded-lg ${isOpen && "py-1 border border-default"}`}
        >
          {options.map((item, i) => (
            <div
              onClick={() => {
                setIsOpen(false);
                onChange?.(item);
              }}
              className={`py-2 px-4 hover:bg-surface cursor-pointer ${item === selected && "bg-surface"} ${i > 0 && "border-t border-default"}`}
              key={i}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
