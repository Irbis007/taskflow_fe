import type { TaskPriority } from "../models";

export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case "Low":
      return `success`;
    case "Medium":
      return `warning`;
    case "Hight":
      return `danger`;
  }
}
