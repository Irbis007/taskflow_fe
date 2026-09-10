import { CardWrapper } from "@shared/ui";
import { Activity } from "@shared/models";
import { ActivityRow } from "@entities/activity";

export function LastActivity({ lastActivity }: { lastActivity: Activity[] }) {
  return (
    <CardWrapper className="flex-1/2 min-w-100">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Last activity</div>
      </div>
      <div className="mt-4">
        {lastActivity.map((item, i) => (
          <div key={i} className={`py-2 ${i > 0 && "border-t border-default"}`}>
            <ActivityRow key={i} activity={item} type="simple" />
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
