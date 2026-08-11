export const URLS = {
  login: "/login",
  registration: "/registration",
  home: "/",
  kanban: "/kanban",
  chat: "/chat",
  users: "/users",
  projects: {
    default: "/projects",
    create: "/projects/create",
    id: ":id",
  },
  task: {
    default: "/kanban/task",
    create: "/kanban/task/create",
    id: "/kanban/task/:id",
  },
  settings: {
    default: "/settings",
    staticParams: {
      profile: "profile",
      security: "security",
      notification: "notification",
      appearance: "appearance",
      workspace: "workspace",
      integration: "integration",
      dangerZone: "danger-zone",
    },
  },
  profile: "/profile",
} as const;
