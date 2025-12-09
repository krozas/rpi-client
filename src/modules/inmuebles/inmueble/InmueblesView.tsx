import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@hooks/useQuery";
import { Table } from "antd/lib";
import FiltroBuscarInmuebles from "./FiltroBuscarInmueble";
import { request } from "@utils/axiosInstance";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BtnInmueble from "../components/BtnInmueble";
import AccionesInmueble from "./ver/acciones/AccionesInmueble";
import EditarInmueble from "./ver/acciones/EditarInmueble";
import ButtonDrawer from "@components/button/ButtonDrawer";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesInmueble inmueble={item} afterCrud={afterCrud} />
    </div>
  );
}
const getColumns = (afterCrud: () => void): ColumnsType<InmuebleDTO> => {
  return [
    {
      key: "descripcion",
      title: "Descripción",
      dataIndex: "descripcion",
      width: "400px",
      render: (_, item) => {
        return <BtnInmueble item={item} />;
      },
    },
    {
      key: "matricula",
      title: "Matricula",
      dataIndex: "matricula",
      width: "200px",
    },
    {
      key: "nomenclaturaCatastral",
      title: "Nomenclatura Catastral",
      dataIndex: "nomenclaturaCatastral",
      align: "center",
      width: "300px",
    },
    {
      key: "bienDeFamilia",
      title: "Bien de Familia",
      align: "center",
      width: "120px",
      render: (_, item) => (item.bienDeFamilia ? "Si" : "No"),
    },
    {
      key: "acciones",
      title: "Acciones",
      align: "center",
      fixed: "right",
      width: "150px",
      render: (_, item) => renderAcciones(item, afterCrud),
    },
  ];
};

export default function InmueblesView() {
  const [filtros, setFiltros] = useState<FiltrosInmueble>();

  const [getInmuebles, { loading, data }] = useQuery(
    (filtros: FiltrosInmueble) => request(`/api/inmueble`, filtros)
  );

  useEffect(() => {
    if (filtros) {
      getInmuebles(filtros);
    }
  }, [filtros]);

  const handleBuscarInmuebles = async () => {
    if (filtros) getInmuebles(filtros);
  };

  const columns = useMemo(
    () => getColumns(handleBuscarInmuebles),
    [getInmuebles]
  );

  return (
    <>
      <h3>Inmuebles</h3>
      <div
        id="headerControlesInmueble"
        className="horizontal-layout items-end justify-between flex-wrap gap-3"
      >
        <FiltroBuscarInmuebles loading={loading} onBuscar={setFiltros} />
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Inmueble"
            contentRenderer={({ onClose }) => (
              <EditarInmueble
                onClose={onClose}
                afterCrud={handleBuscarInmuebles}
              />
            )}
          />
        </Button>
      </div>
      <Table<InmuebleDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
