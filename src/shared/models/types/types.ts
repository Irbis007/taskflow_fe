import type { components } from "./../../api/openapi";
export type Task = components["schemas"]["Task"];
export type KanbanTask = components["schemas"]["KanbanTask"];
export type SingleTask = components["schemas"]["SingleTask"];
export type Subtask = components["schemas"]["SubTaskRow"];
export type TaskCreate = components["schemas"]["TaskCreate"];
export type Project = components["schemas"]["Project"];
export type ProjectPut = components["schemas"]["ProjectPut"];
export type ProjectCreate = components["schemas"]["ProjectCreate"];

export type Status = components["schemas"]["TaskStatus"];
export type ProjectStatus = components["schemas"]["ProjectStatus"];
export type Priority = components["schemas"]["Priority"];
export type Color = components["schemas"]["Colors"];
export type ProjectIcon = components["schemas"]["Icons"];

export type User = components["schemas"]["User"];
export type EntityType = components["schemas"]["EntityType"];
export type Tag = components["schemas"]["Tag"];
export type Comment = components["schemas"]["Comment"];
export type Activity = components["schemas"]["Activity"];
export type ChatItem = components["schemas"]["ChatItem"];
export type Chat = components["schemas"]["Chat"];
