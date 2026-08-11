import { $taskHooks } from "@entities/task";
import { SingleTask } from "@shared/models";
import { Button, Checkbox, Select, Spinner, Textarea } from "@shared/ui";
import { getIconByLabel } from "@shared/utils";
import { ReactNode, useState } from "react";
import { BsTextLeft, BsThreeDots } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { PiListChecks } from "react-icons/pi";
import { TbLink, TbMessageCircle } from "react-icons/tb";
import { getVarPending } from "../utils";
import { TaskComment } from "@features/comments/ui/TaskComment";
import { CreateComment } from "@features/comments";
import { CreateTaskForm } from "@features/create-task";
import { SubtaskRow } from "./SubtaskRow";
import { FaRegClock } from "react-icons/fa";
import { ActivityRow } from "@entities/activity";
import { IoTrashOutline } from "react-icons/io5";

type Props = {
  id: string;
  data: SingleTask;
};

type Tab = "Comments" | "Activity";

const tabsButton: {
  icon: ReactNode;
  label: Tab;
}[] = [
  {
    icon: <TbMessageCircle />,
    label: "Comments",
  },
  {
    icon: <FaRegClock />,
    label: "Activity",
  },
];

export const TaskPageLeftSide = ({ data, id }: Props) => {
  const { updateDescription, updateIsComplete, isPending, variables } =
    $taskHooks.partialUpdate(id);
  const { data: comments = [], isLoading } = $taskHooks.getComments(id);
  const { data: activity = [], isLoading: isActivityLoading } =
    $taskHooks.getActivity(id);
  const { mutateAsync: createComment, isPending: isCommentPending } =
    $taskHooks.createComment(id);

  const [activeTab, setActiveTab] = useState<Tab>("Comments");

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const [description, setDescription] = useState<string>("");
  const [prevDescription, setPrevDescription] = useState<string>();

  if (data?.description && prevDescription !== data.description) {
    setDescription(data.description);
    setPrevDescription(data.description);
  }

  const varsBody = variables?.body;

  const isCompletedPending = getVarPending(
    isPending,
    varsBody?.isCompleted,
    data?.isCompleted,
  );

  const isDescriptionPending = getVarPending(
    isPending,
    varsBody?.description ?? "",
    data?.description ?? "",
  );

  return (
    <div className="w-full flex flex-col">
      <div className="flex p-4 border-b border-default">
        <div className="flex items-center gap-2">
          <div
            style={{
              color: `rgb(var(--${data.project.color}-rgb))`,
            }}
            className=""
          >
            {getIconByLabel(data.project.icon, 20)}
          </div>
          <span className="text-sm text-muted">{data.project.name}</span>
          <span>{">"}</span>
          <span>TASK-{data.id}</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div
            className="border border-default rounded-lg bg-elevated p-2 cursor-pointer hover:bg-surface 
                  transition-colors duration-300"
          >
            <TbLink size={20} />
          </div>
          <Select
            title={<BsThreeDots size={20} />}
            options={[
              {
                label: (
                  <div className="flex items-center gap-2 text-danger">
                    <IoTrashOutline />
                    Delete
                  </div>
                ),
                onChange: () => [],
              },
            ]}
            titleClassName="min-w-0 border border-default rounded-lg bg-elevated p-2 cursor-pointer hover:bg-surface 
                  transition-colors duration-300 text-primary"
            selectWidth="w-max"
            selectPosition="horizontal-center"
            withoutArrow
          />
          <div
            className="border border-default rounded-lg bg-elevated p-2 cursor-pointer hover:bg-surface 
                  transition-colors duration-300"
            onClick={() => window.history.back()}
          >
            <MdClose size={20} />
          </div>
        </div>
      </div>
      <div className="p-4 grow overflow-auto">
        <div className="flex items-center gap-4">
          <Checkbox
            isChecked={!!data.isCompleted}
            onChange={(val) => {
              updateIsComplete(val);
            }}
            size="large"
          />
          <div className="text-xl">{data.title}</div>
          {isCompletedPending && <Spinner />}
        </div>
        <div className="mt-4">
          <div className="flex gap-2 items-center">
            <BsTextLeft />
            <div className="">Description</div>
          </div>
          <Textarea
            className="mt-2"
            value={description ?? data?.description}
            onChange={setDescription}
            placeholder="Enter description for this task"
          />
          {description !== (data.description || "") && (
            <Button
              title="Save"
              onClick={() => updateDescription(description || "")}
              className="ml-auto my-2"
              isLoading={isDescriptionPending}
            />
          )}
        </div>
        <div className="">
          <div className="flex items-center gap-2 mb-2">
            <PiListChecks />
            <span className="text-sm">Subtasks</span>
            <span className="text-sm">0/0</span>
          </div>
          <div>
            {data.subtasks?.map((task, i) => (
              <div
                className={`border-t py-2 ${i > 0 ? "border-default" : "border-transparent"}`}
                key={task.id}
              >
                <SubtaskRow task={task} />
              </div>
            ))}
          </div>
          <div
            className="text-secondary py-2 cursor-pointer hover:text-muted w-max"
            onClick={() => setIsOpenCreateModal(true)}
          >
            + Add subtask
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center gap-4 mb-2">
            {tabsButton.map((item, i) => (
              <div
                onClick={() => setActiveTab(item.label)}
                className={`border-b-2 cursor-pointer flex items-center gap-2 pb-2 
                  ${item.label === activeTab ? "text-accent border-accent" : "text-primary border-transparent"}`}
                key={i}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            {activeTab === "Comments" && (
              <div className="space-y-6">
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <Spinner size={24} />
                  </div>
                )}
                {!!comments &&
                  comments.map((comment) => (
                    <>
                      <TaskComment key={comment.id} comment={comment} />
                    </>
                  ))}
              </div>
            )}
            {activeTab === "Activity" && (
              <div className="space-y-6">
                {isActivityLoading && (
                  <div className="flex items-center justify-center">
                    <Spinner size={24} />
                  </div>
                )}
                {!!activity.length &&
                  activity.map((item) => (
                    <>
                      <ActivityRow key={item.id} activity={item} />
                    </>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0">
        <CreateComment
          onCreateComment={(data) =>
            createComment({ ...data, entityId: id, entityType: "Task" })
          }
          loading={isCommentPending}
        />
      </div>
      <CreateTaskForm
        isOpen={isOpenCreateModal}
        setIsOpen={setIsOpenCreateModal}
        defaultData={{
          parentTask: id,
        }}
      />
    </div>
  );
};
