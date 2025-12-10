import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo } from "react";
import { useQuery } from "@hooks/useQuery";
import { Button, Table } from "antd/lib";
import { request } from "@utils/axiosInstance";
import AccionesDepartamento from "./acciones/AccionesDepartamento";
import { PlusOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import DepartamentoForm from "./acciones/DepartamentoForm";

function renderAcciones(item: any, afterCrud: () => void) {
  return (
    <div className="flex justify-center gap-3 items-center">
      <AccionesDepartamento item={item} afterCrud={afterCrud} />
    </div>
  );
}

const getColumns = (afterCrud: () => void): ColumnsType<DepartamentoDTO> => {
  return [
    {
      key: "codigo",
      title: "Código",
      dataIndex: "codigo",
      width: "100px",
    },
    {
      key: "descripcion",
      title: "Descripción",
      dataIndex: "descripcion",
      align: "center",
      width: "250px",
    },

    {
      key: "acciones",
      title: "Acciones",
      render: (_, item) => renderAcciones(item, afterCrud),
      align: "center",
      fixed: "right",
      width: "150px",
    },
  ];
};

export default function DepartamentosView() {
  const [getDepartamentos, { data }] = useQuery(() =>
    request(`/api/configuracion/departamentos`)
  );

  useEffect(() => {
    getDepartamentos();
  }, []);

  const columns = useMemo(
    () => getColumns(getDepartamentos),
    [getDepartamentos]
  );

  return (
    <>
      <h3>Departamentos</h3>
      <div className="flex justify-end mr-2">
        <Button icon=<PlusOutlined /> type="primary">
          <ButtonDrawer
            title="Crear Departamento"
            contentRenderer={({ onClose }) => (
              <DepartamentoForm
                onClose={onClose}
                afterCrud={getDepartamentos}
              />
            )}
          />
        </Button>
      </div>
      <Table<DepartamentoDTO> columns={columns} dataSource={data} rowKey="id" />
    </>
  );
}
