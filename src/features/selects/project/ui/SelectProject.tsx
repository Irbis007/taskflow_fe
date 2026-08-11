import { $projectHooks } from "@entities/project";
import { useClickOutside } from "@shared/libs";
import { Spinner } from "@shared/ui";
import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type Props = {
  selected?: string;
  required?: boolean;
  containerClassName?: string;
  onChange: (val: string) => void;
};

export function SelectProject({
  required,
  selected,
  onChange,
  containerClassName,
}: Props) {
  const { data: options = [], isLoading } = $projectHooks.getAll();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));
  const selectedProject = options.find((op) => op.id === selected);

  return (
    <div
      className={twMerge("relative w-max ", containerClassName)}
      ref={containerRef}
    >
      <div onClick={() => setIsOpen(true)} className="mb-1 text-primary">
        <span>Project</span>
        {required && <span className="ml-1 text-danger">*</span>}
      </div>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-between gap-4 px-4 py-2 border border-default rounded-lg min-w-40 cursor-pointer bg-elevated"
      >
        <span className={`${!selectedProject ? "text-muted" : "text-primary"}`}>
          {selectedProject?.name ?? "Select project"}
        </span>
        <IoIosArrowDown />
      </div>
      <div
        className={`absolute top-20 left-0 grid w-full transition-all z-100 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`min-h-0 overflow-hidden bg-elevated rounded-lg ${isOpen && "py-1 border border-default"}`}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            options.map((item, i) => (
              <div
                onClick={() => {
                  setIsOpen(false);
                  onChange?.(item.id);
                }}
                className={`py-2 px-4 hover:bg-surface cursor-pointer ${item.id === selected && "bg-surface"} ${i > 0 && "border-t border-default"}`}
                key={i}
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
