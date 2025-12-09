import { Button, Dropdown, MenuProps } from "antd";
import { EyeOutlined, MoreOutlined } from "@ant-design/icons"; 
import PersonasTitulares from "../PersonasTitulares";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { Suspense } from "react";
import RegistrarBienFamilia from "./RegistrarBienFamilia";

interface Props {
  inmueble: any;
  afterCrud: () => void;
}

export default function AccionesInmueble({
  inmueble, 
  afterCrud
}: Readonly<Props>) {
  const items: MenuProps["items"] = [
    {
      key: "verTitulares",
      label: (
        <ButtonDrawer
          title="Titulares" 
          icon = <EyeOutlined />
          contentRenderer={({ onClose }) => (
            <PersonasTitulares
              idInmueble={inmueble.id}
              visible={false}
              onClose={onClose}
            />
          )}
        />
      ),
    },
    {
      key: "registrarBienDeFamilia",
      label: (
         <Suspense fallback={<div>Loading...</div>}>
          <RegistrarBienFamilia inmueble={inmueble} afterCrud={afterCrud} />
        </Suspense>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined size={50} aria-hidden="true" />} />
    </Dropdown>
  );
}
