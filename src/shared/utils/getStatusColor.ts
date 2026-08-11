import type { TaskStatus } from "@shared/models";

export function getStatusColor(status: TaskStatus, prefix: string): string {
  switch (status) {
    case "Done":
      return `${prefix}-success`;
    case "To Do":
      return `${prefix}-accent`;
    case "Backlog":
      return `${prefix}-muted`;
    case "In progress":
      return `${prefix}-warning`;
    case "Review":
      return `${prefix}-danger`;
  }
}
