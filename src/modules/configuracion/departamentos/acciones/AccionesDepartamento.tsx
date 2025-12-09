import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Button, Dropdown, MenuProps } from "antd"; 
import { Suspense } from "react";
import EliminarDepartamento from "./EliminarDepartamento";
import DepartamentoForm from "./DepartamentoForm";

export interface Props {
  afterCrud: () => void;
  item?: any;
}

export default function AccionesDepartamento({ afterCrud, item }: Readonly<Props>) { 

  const items: MenuProps["items"] = [
    {
      key: "editarDepartamento",
      label: (
        <ButtonDrawer
          title="Editar Departamento"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <DepartamentoForm onClose={onClose} afterCrud={afterCrud} input={item} />
          )}
        />
      ),
    },
    {
      key: "eliminarDepartamento",
      label: (
        <Suspense fallback={<div>Loading...</div>}>
          <EliminarDepartamento idDepartamento={item.id} afterCrud={afterCrud} />
        </Suspense>
      ),
      danger: true,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
