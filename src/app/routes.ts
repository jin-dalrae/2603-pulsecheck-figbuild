import { createBrowserRouter } from "react-router";
import { DataDashboard } from "./components/DataDashboard";
import { GlassPage } from "./components/glass/GlassPage";
import { GlassInsightsPage } from "./components/glass/GlassInsightsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GlassPage,
  },
  {
    path: "/glass",
    Component: GlassPage,
  },
  {
    path: "/insights",
    Component: GlassInsightsPage,
  },
  {
    path: "/data",
    Component: DataDashboard,
  },
]);