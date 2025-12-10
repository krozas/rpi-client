import { 
  PlusOutlined,
} from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { useEffect, useMemo } from "react";
import { Button, Flex } from "antd";
import PersonaTitularForm from "./acciones/PersonaTitularForm";
import ButtonDrawer from "@components/button/ButtonDrawer"; 
import AccionesPersona from "./acciones/AccionesPersona";

declare interface Props {
  idInmueble: number;
  visible?: boolean;
  onClose: () => void;
}

const getColumns = (afterCrud: () => void, visible: boolean) => {
  const columns: ColumnsType<any> = [
    {
      key: "nombres",
      title: "Nombres",
      dataIndex: "nombres",
      width: "100px",
    },
    {
      key: "apellidos",
      title: "Apellido",
      dataIndex: "apellidos",
      width: "100px",
    },
    {
      key: "nroDoc",
      title: "Documento",
      dataIndex: "nroDoc",
      width: "100px",
    },
    {
      key: "porcentajeTitularidad",
      title: "Porcentaje",
      dataIndex: "porcentajeTitularidad",
      width: "100px",
    },
    {
      key: visible ? "acciones" : "",
      title: visible ? "Acciones" : "",
      render: (_, item) =>
        visible && <AccionesPersona item={item} afterCrud={afterCrud}   />,
      align: "center",
      width: visible ? "150px" : "0px",
    },
  ];
  return columns;
};

export default function PersonasTitulares({
  idInmueble,
  visible,
  onClose,
}: Readonly<Props>) { 

  const [getPersonasTitulares, { loading, data }] = useQuery(
    (filtros: FiltrosInmueble) => request(`/api/inmueble/titulares`, filtros)
  );

  useEffect(() => {
    if (idInmueble) getPersonasTitulares({ idInmueble: idInmueble });
  }, [idInmueble]);

  const handleBuscarTitulares = async () => {
    if (idInmueble) getPersonasTitulares({ idInmueble: idInmueble });
  };
  const columns = useMemo(
    () => getColumns(handleBuscarTitulares, visible!),
    []
  );

  return (
    <div className="vertical-layout gap-2 grow">
      {visible && (
        <div className="flex justify-end mr-3">
          <Button color="danger" variant="solid" icon={<PlusOutlined />}>
            <ButtonDrawer
              title="Nuevo Titular"
              contentRenderer={({ onClose }) => (
                <PersonaTitularForm
                  onClose={onClose}
                  afterCrud={handleBuscarTitulares}
                  idInmueble={idInmueble}
                />
              )}
            />
          </Button>
        </div>
      )}
      <Table<any>
        columns={columns}
        dataSource={data}
        rowKey="idPersona"
        loading={loading}
      />
      {!visible && (
        <Flex gap="middle" justify="flex-end">
          <Button onClick={() => onClose()} type="primary">
            Cerrar
          </Button>
        </Flex>
      )}
    </div>
  );
}
