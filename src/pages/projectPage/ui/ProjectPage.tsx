import { useState } from "react";
import { IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTasks } from "./ProjectTasks";
import { ProjectBoard } from "./ProjectBoard";
import { ProjectMembers } from "./ProjectMembers";
import { RecentActivity } from "./RecentActivity";
import { $projectHooks } from "@entities/project";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Spinner } from "@shared/ui";
import { CreateTaskForm } from "@features/create-task";
import dayjs from "dayjs";
import { getIconByLabel } from "@shared/utils";
import { EditProjectForm } from "@widgets/forms/project-form";
import { FiEdit3 } from "react-icons/fi";
import { BiLinkAlt } from "react-icons/bi";
import { URLS } from "@shared/consts";

const tabs = ["Overview", "Tasks", "Board", "Members", "Activity"] as const;
export function ProjectPage() {
  const id = useParams<{ id: string }>().id || "";
  const { mutateAsync: onDelete, isPending } = $projectHooks.deleteProject(id);
  const { data, isLoading } = $projectHooks.getOne(id || "");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex flex-col ">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-base/20">
          <Spinner size={40} />
        </div>
      ) : (
        data && (
          <>
            <div
              style={{
                background: `rgb(var(--${data.color}-rgb))`,
              }}
              className="w-full h-2 shrink-0"
            ></div>
            <div className="p-6 bg-surface border-b border-default  shrink-0">
              <div className="flex gap-4">
                <div
                  style={{
                    background: `rgb(var(--${data.color}-rgb) / .2)`,
                    color: `rgb(var(--${data.color}-rgb))`,
                  }}
                  className="flex justify-center items-center p-3 rounded-lg h-max"
                >
                  {getIconByLabel(data.icon)}
                </div>
                <div className="grow">
                  <div className="text-lg max-w-120">{data.name}</div>
                  <div className="text-secondary max-w-120">
                    {data.description}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select
                    title={
                      <div className="flex gap-2 items-center">
                        <IoSettingsOutline />
                        <span>Settings</span>
                        {isPending && <Spinner />}
                      </div>
                    }
                    options={[
                      {
                        label: (
                          <div className="flex items-center gap-2">
                            <FiEdit3 />
                            <span>Edit</span>
                          </div>
                        ),
                        onChange: () => setIsEditProjectOpen(true),
                      },
                      {
                        label: (
                          <div className="flex items-center gap-2">
                            <BiLinkAlt />
                            <span>Link</span>
                          </div>
                        ),
                        onChange: () => setIsEditProjectOpen(true),
                      },
                      {
                        // TODO: Add modal for check delete
                        label: (
                          <div className="flex items-center gap-2 text-danger">
                            <IoTrashOutline />
                            <span>Delete</span>
                          </div>
                        ),
                        onChange: () =>
                          onDelete().then(() =>
                            navigate(URLS.projects.default),
                          ),
                      },
                    ]}
                    withoutArrow
                    titleClassName={"py-1 min-w-30 text-primary"}
                  />
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex gap-2 items-center h-max py-1 px-4 cursor-pointer bg-accent hover:bg-accent/80 rounded-lg text-nowrap"
                  >
                    <span>+</span>
                    <span>Add task</span>
                  </button>
                </div>
              </div>
              <div className="w-11/12 border-b border-default my-6 mx-auto"></div>
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="text-2xl">{data.totalTasks}</div>
                  <div className="text-muted">Total tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-success">
                    {data.completedTasks}
                  </div>
                  <div className="text-muted">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-warning">
                    {data.tasksInProgress}
                  </div>
                  <div className="text-muted">In progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl">
                    {dayjs(data?.deadline).format("DD MMMM")}
                  </div>
                  <div className="text-muted">Deadline</div>
                </div>
                <div className="text-center">
                  <div className="px-4 rounded-full bg-success/20 text-success">
                    {data.status}
                  </div>
                  <div className="text-muted">Status</div>
                </div>
              </div>
            </div>
            <div className="flex gap-6 py-2 px-8 bg-surface border-b border-default">
              {tabs.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`relative w-max cursor-pointer text-secondary hover:text-accent/80 ${item === activeTab && "text-accent"}`}
                >
                  <span>{item}</span>
                  {item === activeTab && (
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="grow p-4 overflow-auto">
              {activeTab === "Overview" && <ProjectOverview />}
              {activeTab === "Tasks" && (
                <ProjectTasks
                  totalTasks={data.totalTasks}
                  setOpenCreateTask={setIsCreateModalOpen}
                />
              )}
              {activeTab === "Board" && <ProjectBoard />}
              {activeTab === "Members" && <ProjectMembers />}
              {activeTab === "Activity" && <RecentActivity />}
            </div>
            <CreateTaskForm
              isOpen={isCreateModalOpen}
              setIsOpen={setIsCreateModalOpen}
              defaultData={{
                project: id,
              }}
            />
            <EditProjectForm
              isOpen={isEditProjectOpen}
              setIsOpen={setIsEditProjectOpen}
              defaultData={data}
            />
          </>
        )
      )}
    </div>
  );
}
