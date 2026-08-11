import { $taskHooks } from "@entities/task";
import { Spinner } from "@shared/ui";
import { useParams } from "react-router-dom";
import { TaskPageLeftSide } from "./TaskPageLeftSide";
import { TaskPageRightSide } from "./TaskPageRightSide";

export function TaskPage() {
  const id = useParams<{ id: string }>().id || "";

  const { data, isLoading } = $taskHooks.getOne(id);


  return (
    <div className="relative flex h-screen">
      {isLoading ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <Spinner size={40} />
        </div>
      ) : (
        !!data && (
          <>
            <TaskPageLeftSide data={data} id={id} />
            <TaskPageRightSide data={data} id={id} />
          </>
        )
      )}
    </div>
  );
}
