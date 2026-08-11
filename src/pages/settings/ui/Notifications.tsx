import { CardWrapper, Switch } from "@shared/ui";
import { FaRegClock } from "react-icons/fa";
import {  LuMessageSquareText } from "react-icons/lu";
import { TbLayoutKanban, TbUserPlus } from "react-icons/tb";

export function Notifications() {
  return (
    <div className="w-full">
      <div className="text-2xl">Notifications</div>
      <div className="text-secondary">
        Choose what you want to be notified about
      </div>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">In-app notifications</div>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="shrink-0 p-2 rounded-lg text-purple bg-purple/20">
            <TbLayoutKanban size={20} />
          </div>
          <div className="grow">
            <div className="">Task assigned to me</div>
            <div className="text-muted text-sm">
              When someone assigns a task to you
            </div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="shrink-0 p-2 rounded-lg text-success bg-success/20">
            <LuMessageSquareText size={20} />
          </div>
          <div className="grow">
            <div className="">Comments & mentions</div>
            <div className="text-muted text-sm">
              When someone mentions you or comments
            </div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="shrink-0 p-2 rounded-lg text-warning bg-warning/20">
            <FaRegClock size={20} />
          </div>
          <div className="grow">
            <div className="">Deadline reminders</div>
            <div className="text-muted text-sm">1 day before a task is due</div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="shrink-0 p-2 rounded-lg text-danger bg-danger/20">
            <TbUserPlus size={20} />
          </div>
          <div className="grow">
            <div className="">New team member</div>
            <div className="text-muted text-sm">
              When someone joins your project
            </div>
          </div>
          <Switch />
        </div>
      </CardWrapper>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Email notifications</div>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="grow">
            <div className="">Weekly digest</div>
            <div className="text-muted text-sm">
              Summary of your tasks every Monday
            </div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="grow">
            <div className="">Project updates</div>
            <div className="text-muted text-sm">
              Important changes in your projects
            </div>
          </div>
          <Switch />
        </div>
      </CardWrapper>
    </div>
  );
}
