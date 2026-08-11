import { useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  value: string | undefined;
  onChange: (val: string) => void;
  className?: string;
  containerClassName?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  charsLimit?: number;
  hideLimit?: boolean;
}

export function Textarea({
  onChange,
  className,
  label,
  required,
  charsLimit = 500,
  hideLimit,
  containerClassName,
  ...props
}: Props) {
  const id = useId();
  return (
    <div className={twMerge("flex flex-col gap-1", containerClassName)}>
      {!!label && (
        <label htmlFor={id} className="text-primary">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      <div
        className={`bg-elevated border border-default rounded-lg ${className}`}
      >
        <textarea
          id={id}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          className="w-full outline-none p-2 text-primary resize-none h-20"
          {...props}
        />
      </div>
      {!hideLimit && (
        <div className="text-sm text-right">
          {props.value?.length ?? 0}/{charsLimit}
        </div>
      )}
    </div>
  );
}
