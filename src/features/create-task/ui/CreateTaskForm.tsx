import { $taskHooks } from "@entities/task";
import { SelectProject } from "@features/selects/project/@x/create-task-form";
import { SelectStatus } from "@features/selects/status/@x/create-task-form";
import { TagsSelect } from "@features/selects/tags/@x/create-task-form";
import { useClickOutside } from "@shared/libs";
import type { Priority, Task, TaskCreate } from "@shared/models";
import {
  Button,
  CalendarPicker,
  CardWrapper,
  Input,
  Overview,
  Textarea,
  OutlinedButton,
} from "@shared/ui";
import { getInitials, getRgbColor } from "@shared/utils";
import { useForm } from "@tanstack/react-form";
import { useRef, type ReactNode } from "react";
import { GoPlus } from "react-icons/go";
import { IoArrowDown, IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { LuEqual, LuPaperclip } from "react-icons/lu";
import { PiWarningCircle } from "react-icons/pi";

type PriorityObject = {
  priority: Priority;
  icon: ReactNode;
  color: string;
};

const priority: PriorityObject[] = [
  {
    priority: "Hight",
    icon: <PiWarningCircle />,
    color: "danger",
  },
  {
    priority: "Medium",
    icon: <LuEqual />,
    color: "warning",
  },
  {
    priority: "Low",
    icon: <IoArrowDown />,
    color: "success",
  },
];

const users = [
  {
    name: "Roman",
    surname: "Abramenko",
    color: "purple",
    id: "1",
  },
  {
    name: "Anatoly",
    surname: "Shushkodmov",
    color: "success",
    id: "2",
  },
  {
    name: "Konstaintin",
    surname: "Shushkodom",
    color: "warning",
    id: "3",
  },
];

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onSubmit?: (val: Task) => void;
  defaultData?: Partial<TaskCreate>;
};

export function CreateTaskForm({ isOpen, setIsOpen, defaultData }: Props) {
  const { mutateAsync, isPending } = $taskHooks.createTask();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setIsOpen(false));

  const defaultValues: TaskCreate = {
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
    deadline: null,
    assignees: [],
    tags: [],
    project: defaultData?.project ?? "",
    parentTask: defaultData?.parentTask ?? undefined,
    estimate: "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      await mutateAsync(value).then(() => setIsOpen(false));
    },
  });
  return (
    <Overview className={`${isOpen ? "block" : "hidden"}`}>
      <CardWrapper
        ref={modalRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-200 max-h-[calc(100vh-2.5rem)] p-0"
      >
        <div className="flex gap-3 items-center p-4 border-b border-default">
          <div className="w-max p-2 rounded-lg text-accent bg-accent/20">
            <GoPlus size={20} />
          </div>
          <div className="grow text-xl font-medium text-primary">
            Create task
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="flex justify-center items-center text-primary bg-elevated w-8 h-8 border
          transition-colors duration-300 border-default rounded-lg hover:bg-surface cursor-pointer"
          >
            <IoCloseOutline size={24} />
          </div>
        </div>
        <div className="space-y-4 p-4">
          <form.Field
            name="title"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="e.g. Fix auth token refresh bug"
                label="Task title"
                required
              />
            )}
          />
          <form.Field
            name="description"
            children={(field) => (
              <Textarea
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Add more details about this task..."
                label="Description"
              />
            )}
          />
          <div className="flex gap-4">
            <form.Field
              name="project"
              children={(field) => (
                <SelectProject
                  required
                  onChange={field.handleChange}
                  selected={field.state.value}
                  containerClassName="w-full"
                />
              )}
            />
            <form.Field
              name="status"
              children={(field) => (
                <SelectStatus
                  onChange={field.handleChange}
                  selected={field.state.value}
                  containerClassName="w-full"
                />
              )}
            />
          </div>
          <form.Field
            name="priority"
            children={(field) => (
              <div className="space-y-1">
                <div className="">Priority</div>
                <div className="flex gap-2">
                  {priority.map((item, i) => (
                    <div
                      key={i}
                      style={
                        item.priority === field.state.value
                          ? {
                              borderColor: `rgb(var(--${item.color}-rgb))`,
                              background: `rgb(var(--${item.color}-rgb) / .1)`,
                              color: `rgb(var(--${item.color}-rgb))`,
                            }
                          : undefined
                      }
                      onClick={() => field.setValue(item.priority)}
                      className="flex items-center justify-center gap-2 w-full p-1 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-primary/20"
                    >
                      {item.icon}
                      <span>{item.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
          <div className="flex items-center gap-4 w-full">
            <form.Field
              name="deadline"
              children={(field) => {
                return (
                  <CalendarPicker
                    label="Deadline"
                    value={field.state.value}
                    onChange={field.handleChange}
                    minDate={new Date()}
                  />
                );
              }}
            />
            <form.Field
              name="estimate"
              children={(field) => (
                <Input
                  label="Estimate"
                  value={field.state.value}
                  onChange={field.handleChange}
                  className="w-full"
                  placeholder="e.g. 4h 23m"
                />
              )}
            />
          </div>
          <div className="">
            <div className="mb-1">Assign to</div>
            <form.Field
              name="assignees"
              children={(field) => (
                <div className="flex items-center gap-1">
                  {users.map((item) => {
                    const initials = getInitials(item.name, item.surname);
                    const isSelected = field.state.value.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        style={{
                          background: getRgbColor(item.color, 0.2),
                        }}
                        className="w-max p-0.5 rounded-full"
                        onClick={() => {
                          if (isSelected) {
                            field.handleChange((prev) =>
                              prev.filter((u) => u !== item.id),
                            );
                          } else {
                            field.handleChange((prev) => [...prev, item.id]);
                          }
                        }}
                      >
                        <div
                          style={{
                            color: getRgbColor(item.color),
                            ...(isSelected && {
                              borderColor: getRgbColor(item.color),
                            }),
                          }}
                          className={`flex justify-center items-center w-8 h-8 rounded-full cursor-pointer border-2 border-transparent text-xs`}
                          key={item.id}
                        >
                          {initials}
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-center items-center w-8.5 h-8.5 bg-elevated rounded-full cursor-pointer border-2 border-default border-dashed text-sm">
                    <GoPlus size={18} />
                  </div>
                </div>
              )}
            />
          </div>
          <div className="relative">
            <div className="mb-1">Tags</div>

            <form.Field
              name="tags"
              children={(field) => (
                <div className="flex items-center gap-1">
                  <TagsSelect
                    defaultValue={field.state.value}
                    onChange={field.handleChange}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-default mt-3">
          <div className="flex items-center gap-2 cursor-pointer text-muted">
            <LuPaperclip size={18} />
            <span>Attach file</span>
          </div>
          <div className="flex items-center gap-2">
            <OutlinedButton title="Cancel" onClick={() => setIsOpen(false)} />
            <Button
              title="Create task"
              icon={<IoCheckmark size={20} />}
              className="gap-1"
              onClick={() => form.handleSubmit()}
              isLoading={isPending}
            />
          </div>
        </div>
      </CardWrapper>
    </Overview>
  );
}
