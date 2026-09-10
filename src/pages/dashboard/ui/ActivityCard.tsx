import { CardWrapper } from "@shared/ui";
import type { IconType } from "react-icons";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  title: string;
  Icon: IconType;
  data: {
    total: number;
    difference: number;
  };
  rgbColor: string;
}

export function ActivityCard({
  rgbColor,
  data: { total, difference },
  title,
  Icon,
}: Props) {
  const isLower = difference < 0;
  return (
    <CardWrapper className="flex-1/4">
      <div className="flex items-center justify-between">
        <div className="text-secondary">{title}</div>
        <div
          className="w-max p-2 rounded-lg"
          style={{
            background: `rgb(var(${rgbColor}) / .2)`,
            color: `rgb(var(${rgbColor}))`,
          }}
        >
          {<Icon size={20} />}
        </div>
      </div>
      <div className="mt-2 text-4xl font-bold">{total}</div>
      <div
        className={`flex items-center gap-2 mt-2 ${isLower ? "text-danger" : difference === 0 ? "text-primary" : "text-success"}`}
      >
        {difference !== 0 && (
          <div className={`w-max ${isLower && "rotate-180"}`}>
            <FaArrowUp />
          </div>
        )}
        {difference} <span>this week</span>
      </div>
    </CardWrapper>
  );
}
