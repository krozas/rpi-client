import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Button, Flex, Table } from "antd/lib";

import { useEffect, useMemo } from "react";

declare interface Props {
  idPersona: number;
  onClose: () => void;
}

const getColumns = () => {
  const columns: ColumnsType<any> = [
    {
      key: "nomenclaturaCatastral",
      title: "Nomenclatura Catastral",
      dataIndex: "nomenclaturaCatastral",
      width: "100px",
    },
    {
      key: "matricula",
      title: "Matricula",
      dataIndex: "matricula",
      width: "100px",
    },
    {
      key: "bienDeFamilia",
      title: "Bien de Familia",
      width: "100px",
      render: (_, item) => (item.bienDeFamilia ? "Si" : "No"),
    },
    {
      key: "porcentajeTitularidad",
      title: "Porcentaje",
      dataIndex: "porcentajeTitularidad",
      width: "100px",
    },
  ];

  return columns;
};

export default function InmueblePersonas({
  idPersona,
  onClose,
}: Readonly<Props>) {
  const [getInmuebles, { loading, data }] = useQuery(
    (filtros: FiltrosInmueble) => request(`/api/inmueble/titulares`, filtros)
  );

  useEffect(() => {
    if (idPersona) getInmuebles({ idPersona: idPersona });
  }, [idPersona]);

  const columns = useMemo(() => getColumns(), []);

  return (
    <div className="vertical-layout gap-2 grow">
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} type="primary">
          Cerrar
        </Button>
      </Flex>
    </div>
  );
}
