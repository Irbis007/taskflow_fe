import { CardWrapper } from "@shared/ui";
import { EChartsReact } from "react-echarts-library";
import type { EChartsOption } from "echarts";
import { BodyResponseType } from "@shared/models";
type Tasks = BodyResponseType<"get", "/api/dashboard">["tasksByStatus"];

const option = (tasks: Tasks): EChartsOption => {
  const data = Object.entries(tasks).map(([name, value]) => ({ name, value }));
  const totalTasks = data.reduce((acc, task) => {
    return acc + task.value;
  }, 0);
  return {
    graphic: [
      {
        type: "text",
        top: "center",

        style: {
          text: `${totalTasks}`,
          fill: "#fff",
          fontSize: 18,
          x: 100 - (totalTasks.toString().length * 5),
          width: 100,
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
        data,
      },
    ],
  };
};

export function TasksByStatus({ tasks }: { tasks: Tasks }) {
  return (
    <CardWrapper>
      <div className="text-xl font-bold">Tasks by status</div>
      <div className="flex gap-5">
        <div className="w-75 h-50">
          <EChartsReact
            style={{
              height: "200px",
            }}
            option={option(tasks)}
          />
        </div>
      </div>
    </CardWrapper>
  );
}
