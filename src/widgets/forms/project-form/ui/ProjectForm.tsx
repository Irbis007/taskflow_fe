import { $userHooks } from "@entities/user/api";
import { ProjectStatusSelect } from "@features/selects/project-status";
import { useClickOutside } from "@shared/libs";
import type { Color, Project, ProjectCreate, ProjectPut } from "@shared/models";
import {
  Button,
  CalendarPicker,
  CardWrapper,
  Input,
  OutlinedButton,
  Overview,
  Spinner,
  Textarea,
} from "@shared/ui";
import { getIconByLabel, getInitials } from "@shared/utils";
import { useForm } from "@tanstack/react-form";
import { useRef } from "react";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { TbFolderPlus } from "react-icons/tb";

const iconLabels = [
  "phone",
  "dashboard",
  "api",
  "security",
  "server",
  "docs",
  "paint",
  "chart",
  "cart",
  "github",
  "mail",
  "rocket",
] as const;

const colors: Color[] = [
  "purple",
  "success",
  "warning",
  "danger",
  "blue",
  "pink",
] as const;

type Props = {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  defaultData?: Project;
  isLoading?: boolean;
} & (
  | {
      type: "create";
      onSubmit: (val: ProjectCreate) => void;
    }
  | {
      type: "edit";
      onSubmit: (val: ProjectPut) => void;
    }
);

export function ProjectForm({
  isOpen,
  setIsOpen,
  onSubmit,
  defaultData,
  type,
  isLoading,
}: Props) {
  const { data: users = [], isLoading: isUsersLoading } = $userHooks.getAll();
  const containerRef = useRef(null);
  useClickOutside(containerRef, () => setIsOpen(false));

  const defaultValues: ProjectPut = {
    ...defaultData,
    name: defaultData?.name ?? "",
    color: defaultData?.color ?? "purple",
    icon: defaultData?.icon ?? "phone",
    status: defaultData?.status ?? "Planned",
    members: defaultData?.members?.map((item) => item.id) ?? [],
  };

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <Overview className={isOpen ? "block" : "hidden"}>
      <CardWrapper
        ref={containerRef}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-200 max-h-[calc(100vh-2.5rem)] p-0"
      >
        <div className="flex gap-3 items-center p-4 border-b border-default">
          <form.Subscribe
            children={(state) => (
              <div
                style={{
                  color: `rgb(var(--${state.values.color}-rgb))`,
                  background: `rgb(var(--${state.values.color}-rgb) / .2)`,
                }}
                className="w-max p-2 rounded-lg"
              >
                <TbFolderPlus size={20} />
              </div>
            )}
          />
          <div className="grow text-xl font-medium text-primary">
            Create project
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="flex justify-center items-center text-primary bg-elevated w-8 h-8 border
                transition-colors duration-300 border-default rounded-lg hover:bg-surface cursor-pointer"
          >
            <IoCloseOutline size={24} />
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="">
            {/* TODO: Create custom Label component */}
            <div className="mb-2">
              Project name
              <span className="text-danger ml-1">*</span>
            </div>
            <div className="flex items-center gap-3">
              <form.Subscribe
                children={(state) => (
                  <div
                    style={{
                      color: `rgb(var(--${state.values.color}-rgb))`,
                      background: `rgb(var(--${state.values.color}-rgb) / .2)`,
                    }}
                    className="flex justify-center items-center w-16 h-16 rounded-xl border border-default"
                  >
                    {getIconByLabel(state.values.icon, 28)}
                  </div>
                )}
              />

              <form.Field
                name="name"
                children={(field) => (
                  <Input
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder="e.g. Mobile app v2.0"
                    className="w-full"
                  />
                )}
              />
            </div>
          </div>
          <form.Field
            name="description"
            children={(field) => (
              <Textarea
                value={field.state.value}
                onChange={field.handleChange}
                label="Description"
                placeholder="What is this project about?"
              />
            )}
          />
          <form.Field
            name="icon"
            children={(field) => (
              <div>
                <div className="mb-2">Color</div>
                <div className="flex gap-2">
                  {iconLabels.map((item) => (
                    <div
                      key={item}
                      onClick={() => field.handleChange(item)}
                      className={`border p-2 rounded-lg cursor-pointer hover:bg-accent/20 ${
                        field.state.value === item
                          ? "border-accent text-accent bg-accent/20"
                          : "border-default text-primary bg-primary/20"
                      }`}
                    >
                      {getIconByLabel(item)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
          <form.Field
            name="color"
            children={(field) => (
              <div>
                <div className="mb-2">Color</div>
                <div className="flex">
                  {colors.map((item) => (
                    <div
                      key={item}
                      className={`p-0.5 border-2 rounded-full ${item === field.state.value ? "border-primary" : "border-transparent"}`}
                    >
                      <div
                        onClick={() => field.handleChange(item)}
                        className={`w-8 h-8 rounded-full cursor-pointer hover:bg-accent/20 `}
                        style={{
                          background: `rgb(var(--${item}-rgb))`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
          <div className="flex gap-4">
            <form.Field
              name="deadline"
              children={(field) => (
                <CalendarPicker
                  label="Deadline"
                  value={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            />
            <form.Field
              name="status"
              children={(field) => (
                <ProjectStatusSelect
                  containerClassName="w-full"
                  selected={field.state.value}
                  onChange={field.handleChange}
                />
              )}
            />
          </div>
          {/* TODO: Add visibility */}
          <div className="">
            <div className="mb-2">Add members</div>
            <div className="flex gap-2">
              {!isUsersLoading ? (
                <form.Field
                  name="members"
                  children={(field) => (
                    <>
                      {users.map((item) => {
                        const initials = getInitials(item.name, item.surname);
                        const isSelected = field.state.value.includes(item.id);
                        return (
                          <div
                            style={{
                              background: `rgb(var(--${item.color}-rgb) / .2)`,
                            }}
                            className="p-0.5 rounded-full cursor-pointer hover:opacity-80"
                            key={item.id}
                            onClick={() => {
                              if (isSelected) {
                                field.handleChange((prev) =>
                                  prev.filter((u) => u !== item.id),
                                );
                              } else {
                                field.handleChange((prev) => [
                                  ...prev,
                                  item.id,
                                ]);
                              }
                            }}
                          >
                            <div
                              style={
                                isSelected
                                  ? {
                                      borderColor: `rgb(var(--${item.color}-rgb))`,
                                      color: `rgb(var(--${item.color}-rgb))`,
                                    }
                                  : { color: `rgb(var(--${item.color}-rgb))` }
                              }
                              className={`flex justify-center items-center w-8 h-8 border-2 rounded-full border-transparent`}
                            >
                              {initials}
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex justify-center items-center w-8.5 h-8.5 bg-elevated rounded-full cursor-pointer border-2 border-default border-dashed text-sm">
                        <GoPlus size={18} />
                      </div>
                    </>
                  )}
                />
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-default mt-4">
          <div className="flex gap-2 justify-end">
            <OutlinedButton title="Cancel" onClick={() => setIsOpen(false)} />
            <Button
              title={type === "create" ? "Create project" : "Edit project"}
              onClick={() => form.handleSubmit()}
              icon={<TbFolderPlus />}
              isLoading={isLoading}
            />
          </div>
        </div>
      </CardWrapper>
    </Overview>
  );
}
