import { useClickOutside } from "@shared/libs";
import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Spinner } from "./Spinner";

interface Props {
  value: string;
  onChange: (val: string) => void;
  isActivatable?: boolean;
  iconPos?: "left" | "right";
  isLoading?: boolean;
  onSearch?: () => void;
  setFocus?: (val: boolean) => void;
}

export function SearchInput({
  value,
  onChange,
  onSearch,
  setFocus,
  isActivatable,
  iconPos = "right",
  isLoading,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useClickOutside(wrapperRef, () => setIsActive(false));

  return (
    <div
      className={`flex items-center h-12 px-2 py-1 bg-elevated border border-default rounded-lg cursor-pointer ${iconPos === "left" && "flex-row-reverse"}`}
      onClick={() => {
        setIsActive(true);
        inputRef?.current?.focus();
      }}
      ref={wrapperRef}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        ref={inputRef}
        onFocus={() => setFocus?.(true)}
        onBlur={() => setFocus?.(false)}
        placeholder="Search..."
        className={`overflow-hidden block outline-hidden 
          ${isActivatable && !isActive ? "w-0" : "w-full"}`}
      />
      <div
        className="text-secondary p-1 flex justify-center items-center rounded-full transition-colors duration-300 hover:bg-accent/20"
        onClick={onSearch}
      >
        {isLoading ? <Spinner size={24}/> : <IoIosSearch size={24} />}
      </div>
    </div>
  );
}
