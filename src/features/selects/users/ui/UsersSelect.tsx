import { UserAvatar } from "@entities";
import { $userHooks } from "@entities/user/api";
import { useClickOutside } from "@shared/libs";
import { User } from "@shared/models";
import { Spinner } from "@shared/ui";
import { compareArrays } from "@shared/utils";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";

type Props = {
  required?: boolean;
  containerClassName?: string;
  label?: string;
  isLoading?: boolean;
} & (
  | {
      userAsEntity: true;
      selected: User[];
    }
  | {
      userAsEntity?: undefined;
      selected: string[];
    }
) &
  (
    | {
        isMultiple: true;
        onChange?: undefined;
        onSubmitByClose: (val: string[]) => void;
        unselectable?: undefined;
      }
    | {
        isMultiple?: undefined;
        onChange: (val: string) => void;
        onSubmitByClose?: undefined;
        unselectable?: undefined;
      }
    | {
        isMultiple?: undefined;
        onChange?: undefined;
        onSubmitByClose?: undefined;
        unselectable: true;
      }
  );

export function UsersSelect({
  required,
  selected,
  onChange,
  onSubmitByClose,
  containerClassName,
  label,
  isMultiple,
  userAsEntity,
  unselectable,
  isLoading,
}: Props) {
  const { data, isLoading: isUsersLoading } = $userHooks.getAll();

  const selectedIds = !userAsEntity
    ? selected
    : selected.map((item) => item.id);
  const [selectedUsers, setSelectedUsers] = useState<User[]>(
    data?.filter((u) => selectedIds.includes(u.id)) ?? [],
  );

  useEffect(() => {
    if (data) {
      setSelectedUsers(data.filter((u) => selectedIds.includes(u.id)) || []);
    }
  }, [data, selectedIds]);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const selectRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => {
    const selected = selectedUsers.map((u) => u.id);
    if (onSubmitByClose && !compareArrays(selected, selectedIds) && isOpen)
      onSubmitByClose(selected);
    setIsOpen(false);
  });

  const [selectTop, setSelectTop] = useState("0px");

  function updateTop() {
    const height = selectRef.current?.clientHeight ?? 0;
    setSelectTop(`${height + 35}px`);
  }

  useEffect(() => {
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [selectRef, selectedUsers]);

  function handleChange(user: User) {
    if (unselectable) return;
    if (isMultiple) {
      setSelectedUsers((prev) => {
        if (prev.some((u) => u.id === user.id))
          return prev.filter((u) => u.id !== user.id);
        return [...prev, user];
      });
    } else {
      onChange(user.id);
    }
  }

  return (
    <div
      className={twMerge("relative w-max ", containerClassName)}
      ref={containerRef}
    >
      <div
        onClick={() => {
          if (!unselectable) setIsOpen(true);
        }}
        className="mb-1 text-primary"
      >
        <span>{label ?? "Users"}</span>
        {required && <span className="ml-1 text-danger">*</span>}
      </div>

      <div
        onClick={() => {
          if (!unselectable) setIsOpen((prev) => !prev);
        }}
        className={`flex w-full items-start justify-between gap-4 ${selectedUsers.length ? "px-2 py-1" : "px-4 py-2"} border 
        border-default rounded-lg min-w-40 ${!unselectable && "cursor-pointer"} bg-elevated`}
        ref={selectRef}
      >
        <div className="w-[calc(100%-32px)]">
          {selectedUsers?.length ? (
            <div className="flex items-center gap-1 overflow-auto">
              {selectedUsers.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-2 py-1 px-2 rounded-sm bg-surface text-nowrap">
                  <UserAvatar user={item} />
                  {item.name} {item.surname.charAt(0)}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-muted text-sm">No body selected</span>
          )}
        </div>
        {!unselectable && (
          <div className={`${!selectedUsers.length ? "py-1" : "py-2 pr-2"}`}>
            {isLoading || isUsersLoading ? (
              <Spinner size={16} />
            ) : (
              <IoIosArrowDown />
            )}
          </div>
        )}
      </div>
      <div
        className={`absolute left-0 grid w-full transition-all z-100 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        style={{
          top: selectTop,
        }}
      >
        <div
          className={`min-h-0 overflow-hidden bg-elevated rounded-lg ${isOpen && "py-1 border border-default"}`}
        >
          {data?.map((item, i) => {
            const isSelected = !!selectedUsers.find((u) => u.id === item.id);
            return (
              <div
                onClick={() => {
                  if (!isMultiple) setIsOpen(false);
                  handleChange(item);
                }}
                className={`py-2 px-4 truncate hover:bg-surface cursor-pointer text-sm 
                ${isSelected ? "bg-surface text-accent" : "bg-elevated text-primary"} ${i > 0 && "border-t border-default"}`}
                key={item.id}
              >
                <span>
                  {item.name} {item.surname}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
