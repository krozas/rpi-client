import { useEffect } from "react";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Bar } from "@ant-design/plots";

export default function EstadisticasView() {
  const [getDatosAnioDepartamento, { data: infoEstadisticas }] = useQuery<
    ListResult<any>
  >(() => request(`/api/inmueble/estadisticas`));

  useEffect(() => {
    getDatosAnioDepartamento();
  }, []);

  // Define the type for your data
  const data = infoEstadisticas ?? [];

  const config = {
    data,
    xField: "year",
    yField: "count",
    seriesField: "codigoDepartamento",
    colorField: "year",
    state: {
      unselected: { opacity: 0.5 },
      selected: { lineWidth: 3, stroke: "red" },
    },
    interaction: {
      elementSelect: true,
    },

    // Optional: Customize bar styles
    columnStyle: {
      radius: [4, 4, 0, 0], // Rounded top corners
    },
    height: 400,
    xAxis: {
      type: "time",
    },
    style: {
      maxWidth: 35,
    },
    barWidth: 20, 
    yAxis: {
      label: {
        formatter: (v: any) => {
          return `${v}`.replaceAll(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);
        },
      },
    },
    gap: 20,
    /*scale: {
       x: {
         range: [0, 1], // Controls overall range, less direct for bar width
         tickCount: 5, // Affects bar count/spacing indirectly
       },
        y: {
         range: [1, 0], // Controls overall range, less direct for bar width
         tickCount: 2, // Affects bar count/spacing indirectly
       },
     },*/
  };

  return (
    <>
      <h3>Estadísticas por Año y Departamento</h3>
      <Bar {...config} />
    </>
  );
}
