import { FaCheck, FaRegClock, FaRegFolder } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { ActivityCard } from "./ActivityCard";
import { WeekActivity } from "./WeekActivity";
import { TasksByStatus } from "./TasksByStatus";
import { RecentTasks } from "./RecentTasks";
import { LastActivity } from "./LastActivity";
import { $dashboardHooks } from "@entities/dashboard/api";
import { Spinner } from "@shared/ui";

export function Dashboard() {
  const { data, isLoading, isPending } = $dashboardHooks.getData();
  console.log(isLoading, isPending);
  if (isLoading || isPending) {
    return <Spinner center size={40} />;
  }

  if(!data) return "There is no data"

  return (
    <div className="flex flex-col gap-6 p-6 overflow-auto">
      <div className="flex gap-4">
        <ActivityCard
          title="Active projects"
          Icon={FaRegFolder}
           rgbColor="--accent-rgb"
          data={data?.projects}
        />
        <ActivityCard
          title="Total tasks"
          Icon={FaCheck}
          rgbColor="--success-rgb"
          data={data?.taskActivity}
        />
        <ActivityCard
          title="In progress"
          Icon={FaRegClock}
          rgbColor="--warning-rgb"
          data={data?.inProgress}
        />
        <ActivityCard
          title="Team members"
          Icon={LuUsers}
          rgbColor="--danger-rgb"
          data={data?.members}
        />
      </div>
      <div className="flex gap-4">
        <WeekActivity activity={data.weekActivity}/>
        <TasksByStatus tasks={data.tasksByStatus}/>
      </div>
      <div className="flex gap-4">
        <RecentTasks recentTasks={data.recentTask}/>
        <LastActivity lastActivity={data.lastActivity}/>
      </div>
    </div>
  );
}
