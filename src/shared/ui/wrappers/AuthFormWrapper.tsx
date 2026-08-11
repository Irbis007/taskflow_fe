import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  formId: string;
  onSubmit?: () => void;
  activePrevent?: boolean;
};

export function AuthFormWrapper({
  children,
  formId,
  onSubmit,
  activePrevent,
}: Props) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-100 py-6 px-6 rounded-3xl bg-surface">
        <form
          id={formId}
          onSubmit={(e) => {
            if (!activePrevent) {
              e.preventDefault();
            }
            onSubmit?.();
          }}
          className="flex flex-col gap-4"
        >
          {children}
        </form>
      </div>
    </div>
  );
}
