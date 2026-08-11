import { BsThreeDots } from "react-icons/bs";
import type { Project } from "@shared/models";

interface Props {
  data: Project[];
}

export function ListView({ data }: Props) {
  return (
    <div className="p-4 w-full space-y-4">
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="*:text-left *:py-4 *:text-secondary *:uppercase *:text-sm *:font-normal">
            <th></th>
            <th>Projects</th>
            <th>status</th>
            <th>progress</th>
            <th>team</th>
            <th>tasks</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <ProjectRow key={i} project={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface RowProps {
  project: Project;
}

const ProjectRow = ({ project }: RowProps) => {
  const progress = Math.floor(0);
  return (
    <tr
      className=" border border-default  *:py-4 *:px-2 *:border-y *:border-default rounded-r-lg
       w-full rounded-xl *:bg-surface cursor-pointer duration-300 transition-colors hover:*:bg-accent/20"
    >
      <td className="w-10 border-l border-default rounded-l-xl">
        <div
          style={{
            background: `rgb(var(--${project.color}-rgb) / .2)`,
            color: `rgb(var(--${project.color}-rgb))`,
          }}
          className="mx-auto p-2.5 rounded-lg w-max h-max"
        >
          {/* <project.icon size={18} /> */}
        </div>
      </td>
      <td>
        <div>
          <div className="font-bold">{project.name}</div>
          <div className="text-sm text-muted">updated yesterday</div>
        </div>
      </td>

      <td>
        <div
          style={{
            background: `rgb(var(--${project.color}-rgb) / .2)`,
            color: `rgb(var(--${project.color}-rgb))`,
          }}
          className="px-2 w-max rounded-2xl"
        >
          {project.status}
        </div>
      </td>

      <td>
        <div className="flex gap-2 items-center">
          <div className="relative w-full mt-1 h-1 rounded-sm bg-muted">
            <div
              style={{
                width: progress + "%",
                background: `rgb(var(--${project.color}-rgb))`,
              }}
              className="absolute top-0 left-0 h-1 rounded-sm"
            ></div>
          </div>
          <span className="text-muted text-sm text-nowrap">{progress} %</span>
        </div>
      </td>

      <td>
        <div className="flex">
          <div className="flex -space-x-1">
            {/* {project.users.slice(0, 2).map((item, i) => (
              <UserAvatar
                className="border-2 border-surface"
                user={item}
                key={i}
              />
            ))} */}
          </div>
        </div>
      </td>
      <td>
        <span className="text-secondary">0 tasks</span>
      </td>
      <td className="border-r border-default rounded-r-xl w-6">
        <div className="w-max h-max p-2 rounded-full  text-secondary cursor-pointer hover:bg-accent/20">
          <BsThreeDots />
        </div>
      </td>
    </tr>
  );
};
