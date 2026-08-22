import { createBrowserRouter, Navigate } from "react-router-dom";
import { SecondaryLayout } from "../layout";
import { URLS } from "@shared/consts";
import {
  Chat,
  SelectedChat,
  Dashboard,
  Kanban,
  Projects,
  Users,
  ProjectPage,
  Settings,
  Profile,
  Security,
  Appearance,
  Notifications,
  Workspace,
  DangerZone,
  Integration,
  LoginPage,
  Registration,
  TaskPage,
} from "@pages";
import { NonProtectedRouter } from "./non-protected-router";
import { ProtectedRouter } from "./protected-router";
import { UserProfile } from "@pages/users/ui/UserProfile";

export const router = createBrowserRouter([
  {
    element: <NonProtectedRouter />,
    children: [
      {
        path: URLS.login,
        element: <LoginPage />,
      },
      {
        path: URLS.registration,
        element: <Registration />,
      },
    ],
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        element: <SecondaryLayout />,
        children: [
          {
            path: URLS.home,
            element: <Dashboard />,
          },
          {
            path: URLS.kanban,
            element: <Kanban />,
          },
        ],
      },
      {
        path: URLS.chat,
        element: <Chat />,
        children: [
          {
            path: `${URLS.chat}/:chatId`,
            element: <SelectedChat />,
          },
        ],
      },
      {
        path: `${URLS.users}`,
        element: <Users />,
        children: [
          {
            path: `${URLS.users}/:id`,
            element: <UserProfile />,
          },
        ],
      },

      {
        path: URLS.projects.default,
        element: <Projects />,
      },

      {
        path: `${URLS.projects.default}/${URLS.projects.id}`,
        element: <ProjectPage />,
      },
      {
        path: `${URLS.task.id}`,
        element: <TaskPage />,
      },
      {
        path: URLS.settings.default,
        element: <Settings />,
        children: [
          {
            index: true,
            element: <Navigate to={URLS.settings.staticParams.profile} />,
          },
          {
            path: URLS.settings.staticParams.profile,
            element: <Profile />,
          },
          {
            path: URLS.settings.staticParams.security,
            element: <Security />,
          },
          {
            path: URLS.settings.staticParams.notification,
            element: <Notifications />,
          },
          {
            path: URLS.settings.staticParams.appearance,
            element: <Appearance />,
          },
          {
            path: URLS.settings.staticParams.workspace,
            element: <Workspace />,
          },
          {
            path: URLS.settings.staticParams.integration,
            element: <Integration />,
          },
          {
            path: URLS.settings.staticParams.dangerZone,
            element: <DangerZone />,
          },
        ],
      },
    ],
  },
]);
