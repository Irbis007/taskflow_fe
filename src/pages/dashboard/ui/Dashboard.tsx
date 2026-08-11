import { FaCheck, FaRegClock, FaRegFolder } from "react-icons/fa"
import { LuUsers } from "react-icons/lu"
import { ActivityCard } from "./ActivityCard"
import { WeekActivity } from "./WeekActivity"
import { TasksByStatus } from "./TasksByStatus"
import { RecentTasks } from "./RecentTasks"
import { LastActivity } from "./LastActivity"



const cards = [
  {
    title: 'Active projects',
    Icon: FaRegFolder,
    totalCount: 12,
    difference: 2,
    isLower: false,
    rgbColor: '--accent-rgb'
  },
  {
    title: 'Total tasks',
    Icon: FaCheck,
    totalCount: 247,
    difference: 18,
    isLower: false,
    rgbColor: '--success-rgb'
  },
  {
    title: 'In progress',
    Icon: FaRegClock,
    totalCount: 34,
    difference: 3,
    isLower: true,
    rgbColor: '--warning-rgb'
  },
  {
    title: 'Team members',
    Icon: LuUsers,
    totalCount: 8,
    difference: 1,
    isLower: false,
    rgbColor: '--danger-rgb'
  },
]


export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 overflow-auto">
      <div className="flex gap-4">
        {
          cards.map((item, i) => <ActivityCard key={i} {...item}/>)
        }
      </div>
      <div className="flex gap-4">
        <WeekActivity/>
        <TasksByStatus/>
      </div>
      <div className="flex gap-4">
        <RecentTasks/>
        <LastActivity/>
      </div>
    </div>
  )
}
