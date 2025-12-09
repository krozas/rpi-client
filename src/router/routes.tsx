import MainLayout from "@components/layout/MainLayout";
import { configuracionRoutes } from "@modules/configuracion/routes";
import { inmueblesRoutes } from "@modules/inmuebles/routes";
import { lazy } from "react";

const Index = lazy(() => import("@pages/Index"));
 

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      configuracionRoutes,
      inmueblesRoutes],
  },
];

export { routes };