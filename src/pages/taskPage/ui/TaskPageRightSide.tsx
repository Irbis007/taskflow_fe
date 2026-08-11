import { PrioritySelect } from "@features/selects/priority";
import { SelectStatus } from "@features/selects/status";
import { TagsSelect } from "@features/selects/tags";
import { UsersSelect } from "@features/selects/users";
import { CardWrapper, Input } from "@shared/ui";
import { getIconByLabel } from "@shared/utils";
import { getVarPending } from "../utils";
import { $taskHooks } from "@entities/task";
import dayjs from "dayjs";
import { SingleTask } from "@shared/models";


const getStringTime = (dif: number, date: string) => {
  if (dif / 1000 < 60) {
    return `${Math.floor(dif / 1000)}sec`;
  } else if (dif / 1000 / 60 < 60) {
    return `${Math.floor(dif / 1000 / 60)}min`;
  } else if (dif / 1000 / 60 / 60 < 24) {
    return `${Math.floor(dif / 1000 / 60 / 60)}h`;
  } else if (dif / 1000 / 60 / 60 / 24 > 1 && dif / 1000 / 60 / 60 / 24 < 2) {
    return "Yesterday";
  }
  return dayjs(date).format("MMMM DD YYYY");
};

type Props = {
  id: string;
  data: SingleTask;
};




export function TaskPageRightSide({data, id}: Props) {
  const {
    updateAssignees,
    // updateEstimate,
    updatePriority,
    updateStatus,
    updateTags,
    variables: vars,
    isPending,
  } = $taskHooks.partialUpdate(id);

  const varsBody = vars?.body;

  const isStatusPending = getVarPending(
    isPending,
    varsBody?.status,
    data?.status,
  );
  const isPriorityPending = getVarPending(
    isPending,
    varsBody?.priority,
    data?.priority,
  );
  const isTagsPending = getVarPending(isPending, varsBody?.tags, data?.tags);
  const isAssigneesPending = getVarPending(
    isPending,
    varsBody?.assignees,
    data?.assignees,
  );

  const dateNow = new Date()
  return (
    <div className="flex flex-col max-w-70 w-full border-l border-default">
      <div className="flex items-center px-4 h-17.5 border-b border-default">
        Details
      </div>
      <div className="flex flex-col space-y-4 p-4 grow">
        <SelectStatus
          containerClassName="w-full"
          selected={data.status}
          onChange={updateStatus}
          isLoading={isStatusPending}
        />
        <PrioritySelect
          containerClassName="w-full"
          selected={data.priority}
          onChange={updatePriority}
          isLoading={isPriorityPending}
        />

        <div className=""></div>
        <UsersSelect
          containerClassName="w-full"
          selected={data.assignees}
          onSubmitByClose={updateAssignees}
          isLoading={isAssigneesPending}
          isMultiple
        />
        <UsersSelect
          containerClassName="w-full"
          selected={[data.author.id]}
          unselectable
        />
        <div className="space-y-1">
          <div className="text-secondary">Project</div>
          <CardWrapper className="p-1.5 px-2 flex gap-2 items-center rounded-lg bg-elevated">
            <span
              style={{
                color: `rgb(var(--${data.project.color}-rgb))`,
              }}
            >
              {getIconByLabel(data.project.icon)}
            </span>
            <span>{data.project.name}</span>
          </CardWrapper>
        </div>
        <Input
          value=""
          onChange={() => {}}
          placeholder="Enter estimate time"
          labelClassName="text-secondary"
          label="Estimate"
        />
        <div className="text-secondary space-y-2 grow">
          <div className="">Tags</div>
          <TagsSelect
            defaultValue={data.tags.map(item => item.id)}
            onSubmitByClose={updateTags}
            isLoading={isTagsPending}
          />
        </div>
        <div className="text-secondary text-sm border-t border-default pt-4 ">
          <span>
            Created by {data.author.name} {data.author.surname.charAt(0)}.<br />
            On {dayjs(data.createdAt).format("MMMM DD YYYY")}
          </span>
          <div className="mt-2">
            Last updated{" "}
            {getStringTime(
              dateNow.getTime() - new Date(data.updatedAt).getTime(),
              data.updatedAt,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
