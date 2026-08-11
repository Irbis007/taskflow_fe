import { CardWrapper } from "@shared/ui";
import type { IconType } from "react-icons";
import { FaArrowUp } from "react-icons/fa";

interface Props {
  title: string;
  Icon: IconType;
  totalCount: number;
  difference: number;
  rgbColor: string;
  isLower: boolean;
}

export function ActivityCard({
  rgbColor,
  totalCount,
  difference,
  title,
  Icon,
  isLower,
}: Props) {
  return (
    <CardWrapper className="flex-1/4">
      <div className="flex items-center justify-between">
        <div className="text-secondary">{title}</div>
        <div
          className="w-max p-2 rounded-lg"
          style={{
            background: `rgb(var(${rgbColor}) / .2)`,
            color: `rgb(var(${rgbColor}))`
          }}
        >
          {<Icon size={20}/>}
        </div>
      </div>
      <div className="mt-2 text-4xl font-bold">{totalCount}</div>
      <div className={`flex items-center gap-2 mt-2 ${isLower ? "text-danger" : "text-success"}`}>
        <div className={`w-max ${isLower && "rotate-180"}`}>
          <FaArrowUp />
        </div>
        {difference}{' '}
        <span>this week</span>
      </div>
    </CardWrapper>
  );
}
