import { CardWrapper } from "@shared/ui";
import { EChartsReact } from "react-echarts-library";
import type { EChartsOption } from "echarts";

const option: EChartsOption = {
  graphic: [
    {
      type: "text",
      left: "29%",
      top: "center",
      style: {
        text: `241`,
        fill: "#fff",
        fontSize: 18,
        // textAlign: "center",
      },
    },
  ],
  legend: {
    top: "center",
    right: "0%",
    icon: "circle",
    textStyle: {
      fontSize: "16px",
      color: "white",
    },
    pageIconSize: 1,
    width: "10px",
    itemStyle: {
      borderRadius: "100%",
      borderWidth: 1,
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["55%", "70%"],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        show: false,
      },
      width: "200px",
      height: "200px",
      left: "0%",
      color: ["#6c63ff", "#4fd1a5", "#f59e0b"],
      data: [
        { value: 127, name: "Done" },
        { value: 79, name: "In progress" },
        { value: 41, name: "Review" },
      ],
    },
  ],
};
export function TasksByStatus() {
  return (
    <CardWrapper>
      <div className="text-xl font-bold">Tasks by status</div>
      <div className="flex gap-5">
        <div className="w-75 h-50">
          <EChartsReact
            style={{
              height: "200px",
            }}
            option={option}
          />
        </div>
      </div>
    </CardWrapper>
  );
}
