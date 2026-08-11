import { CardWrapper } from "@shared/ui";
import { FiGithub } from "react-icons/fi";
import { LuFigma } from "react-icons/lu";
import { PiSlackLogo } from "react-icons/pi";

export function Integration() {
  return (
    <div className="w-full">
      <div className="text-2xl">Integrations</div>
      <div className="text-secondary">Connect external tools to Taskflow</div>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Connected apps</div>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="flex items-center justify-center bg-[#24292e] w-12 h-12 rounded-full text-white">
            <FiGithub size={24} />
          </div>
          <div className="grow">
            <div className="">GitHub</div>
            <div className="text-muted text-sm">
              Sync pull requests and commits
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 border border-default rounded-lg">
            Connect
          </button>
        </div>
        <div className="flex items-center gap-4 p-4 border-b border-default">
          <div className="flex items-center justify-center bg-[#4A154B] w-12 h-12 rounded-full text-white">
            <PiSlackLogo size={24} />
          </div>
          <div className="grow">
            <div className="">Slack</div>
            <div className="text-muted text-sm">
              Get notifications in Slack channels
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 border border-default rounded-lg">
            Connect
          </button>
        </div>
        <div className="flex gap-4 p-4">
          <div className="flex items-center justify-center bg-[#0052CC] w-12 h-12 rounded-full text-white">
            <LuFigma size={24} />
          </div>
          <div className="grow">
            <div className="">Figma</div>
            <div className="text-muted text-sm">
              Attach design files to tasks
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 border border-default rounded-lg">
            Connect
          </button>
        </div>
      </CardWrapper>
    </div>
  );
}
