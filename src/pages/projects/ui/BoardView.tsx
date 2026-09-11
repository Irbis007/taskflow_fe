import { CardWrapper, DropdownMenu } from "@shared/ui";
import { BsThreeDots } from "react-icons/bs";
import type { Project } from "@shared/models";
import { useNavigate } from "react-router-dom";
import { URLS } from "@shared/consts";
import { getIconByLabel } from "@shared/utils";
import { UserAvatar } from "@entities";
import { useState } from "react";
import { EditProjectForm } from "@widgets/forms/project-form";
import { $projectHooks } from "@entities/project";

interface Props {
  data: Project[];
}

export function BoardView({ data }: Props) {
  const [projectData, setProjectData] = useState<Project>();
  return (
    <div className="grid grid-cols-2 gap-4 p-3 mt-2 overflow-auto">
      {data.map((item) => (
        <ProjectCard
          key={item.id}
          project={item}
          setEditingProject={setProjectData}
        />
      ))}
      {!!projectData && (
        <EditProjectForm
          defaultData={projectData}
          isOpen={!!projectData}
          setIsOpen={() => setProjectData(undefined)}
        />
      )}
    </div>
  );
}

interface CardProps {
  project: Project;
  setEditingProject: (val: Project) => void;
}

const ProjectCard = ({ project, setEditingProject }: CardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: deleteProject, isPending } = $projectHooks.deleteProject(
    project.id,
  );

  return (
    <CardWrapper
      className="p-0 overflow-visible cursor-pointer transition-opacity duration-300 [&:hover:not(:has(.dropdown:hover))]:opacity-80"
      onClick={() => navigate(`${URLS.projects.default}/${project.id}`)}
    >
      <div
        style={{ background: `rgb(var(--${project.color}-rgb))` }}
        className="w-full h-2 rounded-t-xl"
      ></div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div
            style={{
              background: `rgb(var(--${project.color}-rgb) / .2)`,
              color: `rgb(var(--${project.color}-rgb))`,
            }}
            className="p-2.5 rounded-lg w-max"
          >
            {getIconByLabel(project.icon)}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="relative w-max rounded-full  text-secondary cursor-pointer hover:bg-accent/20"
          >
            <BsThreeDots
              onClick={() => setIsMenuOpen(true)}
              className="p-2"
              size={32}
            />
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
        </div>
        <div className="text-lg font-bold mt-2">{project.name}</div>
        <div className="text-secondary">{project.description}</div>
        <div className="">
          <div className="flex justify-between items-center mt-2 text-muted text-sm">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="relative w-full mt-1 h-1 rounded-sm bg-muted">
            <div
              style={{
                width: project.progress + "%",
                background: `rgb(var(--${project.color}-rgb))`,
              }}
              className="absolute top-0 left-0 h-1 rounded-sm"
            ></div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex -space-x-1">
              {project.members?.map((item, i) => (
                <UserAvatar
                  className="border-2 border-surface"
                  user={item}
                  key={i}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div
                style={{
                  background: `rgb(var(--${project.color}-rgb))`,
                }}
                className="w-2.5 h-2.5 rounded-full"
              ></div>
              <div className="text-sm text-muted">{project.status}</div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
