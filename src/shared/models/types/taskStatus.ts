export const TaskStatus = {
  Backlog: "Backlog",
  ToDo: "To Do",
  InProgress: "In progress",
  Review: "Review",
  Done: "Done",
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
