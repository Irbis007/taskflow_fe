import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  value?: string;
  onChange: (val: string) => void;
  className?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string
  labelClassName?: string
}
export function Input({
  className,
  inputClassName,
  label,
  onChange,
  required,
  labelClassName,
  ...props
}: Props) {
  const id = useId();
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {!!label && (
        <label htmlFor={id} className={twMerge("text-primary", labelClassName)}>
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <div className={twMerge(`bg-elevated border border-default rounded-lg`, inputClassName)}>
        <input
          id={id}
          type="text"
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className={"w-full outline-none p-2 text-primary"}
          {...props}
        />
      </div>
    </div>
  );
}
