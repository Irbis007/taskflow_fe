import { CardWrapper } from "@shared/ui";
import { BsThreeDots } from "react-icons/bs";
import type { Project } from "@shared/models";
import { useNavigate } from "react-router-dom";
import { URLS } from "@shared/consts";

interface Props {
  data: Project[];
}

export function BoardView({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 p-3 mt-2 overflow-auto">
      {data.map((item) => (
        <ProjectCard key={item.id} project={item} />
      ))}
    </div>
  );
}

interface CardProps {
  project: Project;
}

const ProjectCard = ({ project }: CardProps) => {
  const progress = 0;
  const navigate = useNavigate();
  return (
    <CardWrapper
      className="p-0 overflow-hidden cursor-pointer transition-opacity duration-300 hover:opacity-80"
      onClick={() => navigate(`${URLS.projects.default}/${project.id}`)}
    >
      <div
        style={{ background: `rgb(var(--${project.color}-rgb))` }}
        className="w-full h-2"
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
            {/* <project.icon size={18} /> */}
          </div>
          <div className="w-max p-2 rounded-full  text-secondary cursor-pointer hover:bg-accent/20">
            <BsThreeDots />
          </div>
        </div>
        <div className="text-lg font-bold mt-2">{project.name}</div>
        <div className="text-secondary">{project.description}</div>
        <div className="">
          <div className="flex justify-between items-center mt-2 text-muted text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="relative w-full mt-1 h-1 rounded-sm bg-muted">
            <div
              style={{
                width: progress + "%",
                background: `rgb(var(--${project.color}-rgb))`,
              }}
              className="absolute top-0 left-0 h-1 rounded-sm"
            ></div>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex -space-x-1">
              {/* {project.members?.map((item, i) => (
                <UserAvatar
                  className="border-2 border-surface"
                  user={item}
                  key={i}
                />
              ))} */}
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
