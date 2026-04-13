import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Dashboard } from "./components/Dashboard";
import { Settings } from "./components/Settings";
import { Scheduler } from "./components/Scheduler";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { path: "settings", Component: Settings },
      { path: "scheduler", Component: Scheduler },
    ],
  },
]);
