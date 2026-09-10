import { BodyResponseType } from "@shared/models";
import { CardWrapper } from "@shared/ui";
import { Link } from "react-router-dom";

type Activity = BodyResponseType<"get", "/api/dashboard">["weekActivity"];

export function WeekActivity({ activity }: { activity: Activity }) {
  const maxActivity = Math.max(...Object.values(activity));
  const getPercentWidth = (val: number) => {
    return (val * 100) / maxActivity;
  };
  return (
    <CardWrapper className="grow">
      <div className="flex justify-between">
        <div className="text-xl font-bold">Activity this week</div>
        <Link className="link" to={"/"}>
          See all
        </Link>
      </div>
      <div className="space-y-2 mt-3">
        {Object.entries(activity).map(([key, value]) => (
          <div className="flex gap-2 items-center" key={key}>
            <div className="w-10 text-muted">{key}</div>
            <div className="relative rounded-lg w-full bg-elevated h-2 overflow-hidden">
              <div
                style={{
                  width: getPercentWidth(value) + "%",
                }}
                className={`absolute z-10 top-0 left-0 h-2 rounded-lg bg-accent 
                  ${maxActivity / 3 > value && "bg-muted"} ${maxActivity === value && "bg-success"}`}
              ></div>
            </div>
            <div className="w-8 text-center text-secondary">{value}</div>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
