import { ActivityRow } from "@entities/activity";
import { $projectHooks } from "@entities/project";
import { CardWrapper, Spinner } from "@shared/ui";
import { useParams } from "react-router-dom";

export function RecentActivity() {
  const id = useParams<{ id: string }>().id || "";
  const { data: activity = [], isLoading } = $projectHooks.getActivity(id);
  return (
    <CardWrapper className="p-4">
      <div className="text-lg">Project activity</div>
      <div className="mt-2">
        {isLoading ? (
          <Spinner center />
        ) : (
          activity.map((item) => <ActivityRow activity={item} key={item.id} />)
        )}
      </div>
    </CardWrapper>
  );
}
