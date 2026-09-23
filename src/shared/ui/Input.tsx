import { useId } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
  maxLength?: number;
} & (
  | {
      type: "number";
      value: number;
      onChange: (val: number) => void;
    }
  | {
      type?: "text";
      value: string;
      onChange: (val: string) => void;
    }
);
export function Input({
  className,
  inputClassName,
  label,
  onChange,
  required,
  labelClassName,
  error,
  type,
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
      <div
        className={twMerge(
          `bg-elevated border rounded-lg ${error?.length ? "border-danger" : "border-default"}`,
          inputClassName,
        )}
      >
        <input
          id={id}
          type={type}
          onChange={(e) => {
            const value = e.target.value;
            if (type === "number") {
              onChange(+value);
            } else {
              onChange(value);
            }
          }}
          className={`w-full outline-none p-2 text-primary`}
          {...props}
        />
      </div>
      {error?.length && <span className="text-danger text-sm">{error}</span>}
    </div>
  );
}
