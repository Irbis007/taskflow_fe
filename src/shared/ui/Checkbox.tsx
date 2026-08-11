import { useId } from "react";

interface Props {
  isChecked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
  size?: "small" | "large" | "medium";
}

export function Checkbox({
  label,
  isChecked,
  onChange,
  size = "small",
}: Props) {
  const id = useId();
  const containerClassName =
    size === "large" ? "w-7 h-7" : size === "medium" ? "w-5 h-5" : "w-4 h-4";
  const className =
    size === "large"
      ? "w-3 h-4 border-3"
      : size === "medium"
        ? "border-2 w-2 h-2.5"
        : "border-2 w-1.5 h-2";
  return (
    <label
      className={`relative ${containerClassName}  rounded-sm border border-default cursor-pointer has-checked:bg-accent has-checked:border-accent`}
      htmlFor={id}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => onChange(e.currentTarget.checked)}
        className="peer hidden"
        id={id}
      />
      <div
        className={`peer-checked:block absolute top-0.5 left-1/2  -translate-x-1/2 hidden 
       border-white border-t-0 border-r-0 -rotate-45 ${className}`}
      ></div>
      <div>{label}</div>
    </label>
  );
}
