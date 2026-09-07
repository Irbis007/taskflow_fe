import { useClickOutside } from "@shared/libs";
import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";

interface Props {
  value: string;
  onChange: (val: string) => void;
  isActivatable?: boolean;
  iconPos?: "left" | "right";
  onSearch?: () => void;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  isActivatable,
  iconPos = "right",
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const btnRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(btnRef, () => setIsActive(false));

  return (
    <div
      className={`flex items-center px-2 py-1 bg-elevated border border-default rounded-lg cursor-pointer ${iconPos === "left" && "flex-row-reverse"}`}
      onClick={() => inputRef?.current?.focus()}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        ref={inputRef}
        placeholder="Search..."
        className={`${isActivatable && !isActive ? "hidden" : "inline-block"}
          outline-hidden w-full
        `}
      />
      <div
        className="text-secondary p-1 flex justify-center items-center rounded-full transition-colors duration-300 hover:bg-accent/20"
        onClick={onSearch}
      >
        <IoIosSearch size={24} />
      </div>
    </div>
  );
}
