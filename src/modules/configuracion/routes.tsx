import { EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { lazy } from "react"; 
import CiudadesView from "./ciudades/CiudadesView";
const DepartamentosView = lazy(() =>
  import("@modules/configuracion/departamentos/DepartamentosView")
);


const configuracionRoutes = {
  path: "configuracion",
  children: [ 
  { path: "Departamentos", element: <DepartamentosView /> , icon :  <EnvironmentOutlined/>},
  { path: "Ciudades", element: <CiudadesView/> , icon: <GlobalOutlined/> },  
  ],
};

export { configuracionRoutes };
