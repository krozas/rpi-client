import { Button, Descriptions } from "antd";
import PersonasTitulares from "./PersonasTitulares";
import EditarInmueble from "./acciones/EditarInmueble"; 
import { Space } from "antd/lib";
import ButtonDrawer from "@components/button/ButtonDrawer";
import { EditOutlined } from "@ant-design/icons";

interface Props {
  inmueble: InmuebleDTO;
  afterAccion: () => void;
}

export default function InmuebleViewForm({
  inmueble,
  afterAccion,
}: Readonly<Props>) {
  console.log("🚀 ~ InmuebleViewForm ~ inmueble:", inmueble);

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Descriptions
          bordered
          title="Datos del Inmueble"
          size="small"
          column={1}
        >
          <Descriptions.Item label="Matricula">
            {inmueble?.matricula}
          </Descriptions.Item>
          <Descriptions.Item label="Nomenclatura Catastral">
            {inmueble?.nomenclaturaCatastral}
          </Descriptions.Item>
          <Descriptions.Item label="Bien de Familia">
            {inmueble?.bienDeFamilia ? "Si" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label='Departamento'>
            {inmueble?.codigoDepartamento}
          </Descriptions.Item>
          <Descriptions.Item label='Ciudad'>
            {inmueble?.codigoCiudad}
          </Descriptions.Item>
        </Descriptions>
      </Space>
      <Space direction="vertical" style={{ display: "flex" }}>
        <div className="horizontal-layout justify-end gap-2">
          <Descriptions
            extra={
              <Button icon=<EditOutlined /> type="primary">
                <ButtonDrawer
                  title="Editar Inmueble"
                  contentRenderer={({ onClose }) => (
                    <EditarInmueble
                      onClose={onClose}
                      input={inmueble}
                      afterCrud={afterAccion}
                    />
                  )}
                />
              </Button>
            }
          />
        </div>
      </Space>
      <span className="flex-row items-center gap-2">
        <h2 className="text-xl font-bold">Personas Titulares</h2>
      </span>
      <PersonasTitulares
        idInmueble={inmueble?.id}
        visible={true}
        onClose={function (): void {}}
      />
    </>
  );
}
