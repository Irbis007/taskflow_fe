import { UserAvatar } from "@entities";
import { ActivityRow } from "@entities/activity";
import { $projectHooks } from "@entities/project";
import { CardWrapper, Spinner } from "@shared/ui";
import { useParams } from "react-router-dom";

export function ProjectOverview() {
  const id = useParams<{ id: string }>()?.id || "";
  const {
    data: overview,
    isLoading,
    isPending,
  } = $projectHooks.getOverview(id);


  if (isLoading || isPending) {
    return <div className="w-full h-full flex justify-center items-center">
      <Spinner size={32}/>
    </div>;
  }
  if (!overview) {
    return "There is no Data";
  }

  return (
    <div className="">
      <div className="flex gap-4">
        <CardWrapper className="p-4 w-3/5">
          <div className="text-lg">Progress by category</div>
          <div className="w-full mt-4 space-y-2">
            {Object.entries(overview.progressByCategories).map(
              ([key, value], i) => {
                const percent =
                  Math.floor((value.completed * 100) / value.total) || 0;
                return (
                  <div className="flex items-center gap-2" key={i}>
                    <div className="w-20 text-secondary">{key}</div>
                    <div className="relative grow h-1.5 rounded-lg bg-muted">
                      <div
                        style={{
                          width: percent + "%",
                          background: `rgb(var(--accent-rgb))`,
                        }}
                        className="absolute top-0 left-0 h-1.5 rounded-lg"
                      ></div>
                    </div>
                    <div className="w-12 text-right text-muted">%{percent}</div>
                  </div>
                );
              },
            )}
          </div>
        </CardWrapper>
        <CardWrapper className="w-2/5 p-4">
          <div className="flex justify-between">
            <div className="text-lg">Team</div>
            <div className="link">Menage</div>
          </div>
          <div className="mt-4 space-y-2">
            {overview.team.map((item, i) => {
              const name = `${item.name} ${item.surname.charAt(0)}.`;
              return (
                <div className="flex gap-2 items-center" key={i}>
                  <UserAvatar user={item} size="medium" />
                  <div className="grow">
                    <div className="">{name}</div>
                    <div className="text-muted text-sm">{item.email}</div>
                  </div>
                  {/* <div
                    className={`text-sm px-3 p-1 rounded-lg ${item.role === "Lead" ? "text-accent bg-accent/20" : "text-secondary bg-elevated"}`}
                  >
                    {item.role}
                  </div> */}
                </div>
              );
            })}
          </div>
        </CardWrapper>
      </div>

      <CardWrapper className="w-full mt-4 p-4">
        <div className="flex justify-between">
          <div className="text-lg">Recent activity</div>
          <div className="link">See all</div>
        </div>
        <div className="mt-4 space-y-2">
          {overview.recentActivity.map((item) => {
            return <ActivityRow key={item.id} activity={item} />;
          })}
        </div>
      </CardWrapper>
    </div>
  );
}
