import { UserAvatar } from "@entities";
import { $userHooks } from "@entities/user/api";
import { useAuthStore } from "@shared/models";
import { Button, CardWrapper, Input, Spinner } from "@shared/ui";
import { useForm } from "@tanstack/react-form";
import { FiUpload } from "react-icons/fi";

export function Profile() {
  const userId = useAuthStore((state) => state.user)?.id || "";
  const { data: userData, isLoading } = $userHooks.getOne(userId);
  const { mutateAsync: editUser, isPending } = $userHooks.edit(userId);
  const form = useForm({
    defaultValues: {
      name: userData?.name || "",
      surname: userData?.surname || "",
      // jobTitle: userData?. || "",
      timeZone: userData?.timeZone || "",
      role: userData?.role || 'Member'
    },
    onSubmit({ value }) {
      editUser(value);
    },
  });

  if (isLoading) {
    return <Spinner center size={42} />;
  }

  return (
    <div className="w-full">
      <div className="text-2xl">Profile</div>
      <div className="text-secondary">Manage your personal information</div>
      <CardWrapper className="p-0 mt-5 w-full opacity-70 select-none pointer-events-none">
        <div className="p-4 border-b border-default">
          <div className="">Avatar</div>
          <div className="text-muted">Shown across the app</div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <UserAvatar
            user={{ name: "Konstantin", surname: "Shushkodomov" }}
            size="large"
          />
          <div>
            <button className="flex gap-2 items-center bg-elevated border border-default rounded-lg p-2 px-3 text-sm cursor-pointer hover:bg-surface text-primary">
              <FiUpload size={16} />
              <span>Upload photo</span>
            </button>
            <div className="text-muted text-sm mt-1">PNG, JPG up to 2MB</div>
          </div>
        </div>
      </CardWrapper>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Personal info</div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Name</div>
            <div className="text-muted text-sm">
              Your display name across Taskflow
            </div>
          </div>
          <form.Field
            name="name"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Name"
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Surname</div>
            <div className="text-muted text-sm">
              Your display surname across Taskflow
            </div>
          </div>
          <form.Field
            name="surname"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Surname"
              />
            )}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Job title</div>
            <div className="text-muted text-sm">Visible to your teammates</div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Job title" />
        </div>
        {/* <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Bio</div>
            <div className="text-muted text-sm">
              Short description about you
            </div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Bio" />
        </div> */}
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Timezone</div>
            <div className="text-muted text-sm">
              For deadline and notification times
            </div>
          </div>
          <form.Field
            name="timeZone"
            children={(field) => (
              <Input
                value={field.state.value}
                onChange={field.handleChange}
                placeholder="Timezone"
              />
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => state.isDefaultValue}
          children={(isDefaultValue) =>
            !isDefaultValue && (
              <div className="flex items-center gap-4 p-4">
                <Button
                  title="SaveChanges"
                  onClick={() => form.handleSubmit()}
                  className="bg-accent rounded-lg px-3 py-2"
                  isLoading={isPending}
                />
                <button
                  onClick={() => form.reset()}
                  className="bg-elevated rounded-lg px-3 py-2 border border-default"
                >
                  Cancel
                </button>
              </div>
            )
          }
        />
      </CardWrapper>
    </div>
  );
}
