import { CardWrapper } from "@shared/ui";
import { FiUpload } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";

export function DangerZone() {
  return (
    <div className="w-full">
      <div className="text-2xl">Danger zone</div>
      <div className="text-secondary">
        Irreversible actions — proceed with caution
      </div>
      <CardWrapper className="p-0 mt-5 w-full border border-danger/30">
        <div className="p-4 border-b border-default">
          <div className="text-danger">Destructive actions</div>
          <div className="text-muted text-sm">
            These actions cannot be undone
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Export my data</div>
            <div className="text-muted text-sm">
              Download all your tasks, projects, and activity
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 border border-default rounded-lg">
            <FiUpload />
            <span>Export</span>
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Leave workspace</div>
            <div className="text-muted text-sm">
              You will lose access to all projects
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 bg-danger/20 border border-danger rounded-lg text-danger">
            Leave workspace
          </button>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Delete account</div>
            <div className="text-danger text-sm">
              You will lose access to all projects
            </div>
          </div>
          <button className="flex gap-2 items-center py-2 px-4 bg-danger/20 border border-danger rounded-lg text-danger">
            <IoTrashOutline/>
            <span>Leave workspace</span>
          </button>
        </div>
      </CardWrapper>
    </div>
  );
}
