import { BsThreeDots } from "react-icons/bs";
import type { Project } from "@shared/models";
import { UserAvatar } from "@entities";
import { useNavigate } from "react-router-dom";
import { URLS } from "@shared/consts";
import { getIconByLabel } from "@shared/utils";
import { DropdownMenu } from "@shared/ui";
import { $projectHooks } from "@entities/project";
import { useState } from "react";
import { EditProjectForm } from "@widgets/forms/project-form";

interface Props {
  data: Project[];
}

export function ListView({ data }: Props) {
  const [editingProject, setEditingProject] = useState<Project>();
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
            <ProjectRow
              key={i}
              project={item}
              setEditingProject={setEditingProject}
            />
          ))}
        </tbody>
      </table>
      {!!editingProject && (
        <EditProjectForm
          isOpen={!!editingProject}
          setIsOpen={() => setEditingProject(undefined)}
          defaultData={editingProject}
        />
      )}
    </div>
  );
}

interface RowProps {
  project: Project;
  setEditingProject: (val: Project) => void;
}

const ProjectRow = ({ project, setEditingProject }: RowProps) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mutateAsync: deleteProject, isPending } = $projectHooks.deleteProject(
    project.id,
  );
  return (
    <tr
      className=" border border-default  *:py-4 *:px-2 *:border-y *:border-default rounded-r-lg
       w-full rounded-xl *:bg-surface cursor-pointer duration-300 transition-colors hover:*:bg-accent/20"
      onClick={() => navigate(`${URLS.projects.default}/${project.id}`)}
    >
      <td className="w-10 border-l border-default rounded-l-xl">
        <div
          style={{
            background: `rgb(var(--${project.color}-rgb) / .2)`,
            color: `rgb(var(--${project.color}-rgb))`,
          }}
          className="mx-auto p-2.5 rounded-lg w-max h-max"
        >
          {getIconByLabel(project.icon)}
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
                width: project.progress + "%",
                background: `rgb(var(--${project.color}-rgb))`,
              }}
              className="absolute top-0 left-0 h-1 rounded-sm"
            ></div>
          </div>
          <span className="text-muted text-sm text-nowrap">
            {project.progress} %
          </span>
        </div>
      </td>

      <td>
        <div className="flex">
          <div className="flex -space-x-1">
            {project.members.slice(0, 2).map((item, i) => (
              <UserAvatar
                className="border-2 border-surface"
                user={item}
                key={i}
              />
            ))}
          </div>
        </div>
      </td>
      <td>
        <span className="text-secondary">{project.totalTasks} tasks</span>
      </td>
      <td className="border-r border-default rounded-r-xl w-6">
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-max h-max rounded-full  text-secondary cursor-pointer hover:bg-accent/20"
        >
          <BsThreeDots className=" p-2" size={32} onClick={() => setIsMenuOpen(true)}/>
          <DropdownMenu
            isActive={isMenuOpen}
            setIsActive={setIsMenuOpen}
            options={[
              {
                label: "Edit",
                onClick: () => setEditingProject(project),
              },
              {
                label: "Delete",
                onClick: () => deleteProject(),
                disableCloseByCLick: true,
                isLoading: isPending,
                className: "text-red-400",
              },
            ]}
          />
        </div>
      </td>
    </tr>
  );
};
