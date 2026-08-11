import { UserAvatar } from "@entities";
import { CardWrapper, Input } from "@shared/ui";
import { FiUpload } from "react-icons/fi";

export function Profile() {
  return (
    <div className="w-full">
      <div className="text-2xl">Profile</div>
      <div className="text-secondary">Manage your personal information</div>
      <CardWrapper className="p-0 mt-5 w-full">
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
            <div className="">Full name</div>
            <div className="text-muted text-sm">
              Your display name across Taskflow
            </div>
          </div>
          <Input value="" onChange={() => {}}  placeholder="Full Name" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Email</div>
            <div className="text-muted text-sm">
              Used for login and notifications
            </div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Email" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Job title</div>
            <div className="text-muted text-sm">
              Visible to your teammates
            </div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Job title" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Bio</div>
            <div className="text-muted text-sm">
              Short description about you
            </div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Bio" />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Timezone</div>
            <div className="text-muted text-sm">
              For deadline and notification times
            </div>
          </div>
          <Input value="" onChange={() => {}} placeholder="Timezone" />
        </div>
        <div className="flex items-center gap-4 p-4">
          <button className="bg-accent rounded-lg px-3 py-2">Save changes</button>
          <button className="bg-elevated rounded-lg px-3 py-2 border border-default">Cancel</button>
        </div>
      </CardWrapper>
    </div>
  );
}
