import { BarChartOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { lazy, Suspense } from "react";  
import VerInmuebleContainer from "./inmueble/ver/InmuebleContainer"; 

const InmueblesView = lazy(() =>
  import("@modules/inmuebles/inmueble/InmueblesView")
);
 
const PersonasView = lazy(() =>
  import("@modules/inmuebles/personas/PersonasView")
);

const EstadisticasView = lazy(() =>
  import("@modules/inmuebles/estadisticas/EstadisticasView")
);
const inmueblesRoutes = {
  path: "inmuebles",
  children: [ 
  { path: "Inmuebles", element: <InmueblesView /> , icon :  <HomeOutlined />}, 
   {
      path: "ver/:idInmueble",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <VerInmuebleContainer />
        </Suspense>
      ),
    },
    { path: "Personas", element: <PersonasView /> , icon :  <UserOutlined />},
    { path: "Estadísticas", element: <EstadisticasView /> , icon :  <BarChartOutlined />},
  ],
};

export { inmueblesRoutes };
