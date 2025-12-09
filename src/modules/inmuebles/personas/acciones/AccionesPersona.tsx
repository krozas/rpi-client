import { Button, Dropdown, MenuProps } from "antd";
import { EditOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";  
import EditarPersona from "./EditarPersona";
import ButtonDrawer from "@components/button/ButtonDrawer";
import InmueblePersonas from "./InmueblePersonas";
import PersonaForm from "./EditarPersona";

interface Props {
  persona: PersonaDTO;
  afterCrud: () => void;
}

export default function AccionesInmueble({
  persona,
  afterCrud,
}: Readonly<Props>) { 
  const items: MenuProps["items"] = [
    {
      key: "editarPersona",
      label: (
        <ButtonDrawer
          title="Editar Persona"
          icon={<EditOutlined />}
          contentRenderer={({ onClose }) => (
            <PersonaForm
              onClose={onClose}
              input={persona}
              afterCrud={afterCrud}
            />
          )}
        />
      ),
    },
    {
      key: "verInmuebles",
      label: (
        <ButtonDrawer
          title="Ver Inmuebles"
          icon={<EyeOutlined />}
          contentRenderer={({ onClose }) => (
            <InmueblePersonas
              idPersona={persona.id}
              onClose={onClose}
            />
          )}
        />
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
