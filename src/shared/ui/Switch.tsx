import { useId } from "react";

export function Switch({checked, setChecked}: {
  checked: boolean;
  setChecked: (val: boolean) => void;
}) {

  const id = useId();
  return (
    <label
      htmlFor={id}
      className="relative w-16 h-8.5 bg-elevated rounded-full  has-checked:bg-accent transition-colors duration-300 cursor-pointer select-none"
    >
      <input
        id={id}
        type="checkbox"
        className="peer hidden"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <div className="absolute left-1 top-1/2 peer-checked:translate-x-full -translate-y-1/2 h-7 w-7 bg-white rounded-full transition-transform duration-300"></div>
    </label>
  );
}
