import { useQuery } from "@hooks/useQuery";
import CiudadComboBox from "@modules/inmuebles/components/CiudadComboBox";
import DepartamentoComboBox from "@modules/inmuebles/components/DepartamentoComboBox";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, Input, message } from "antd"; 

interface Props {
  input?: any;
  onClose: () => void;
  afterCrud: () => void;
}

export default function EditarInmueble({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertInmueble] = useQuery<number>((inputInmueble: any) =>
    request("/api/inmueble/save", inputInmueble)
  );

  const onFinish = async (values: any) => { 
    values.id = input?.id ?? 0;
    await upsertInmueble(values);
    message.success(
      `Inmueble ${values.id ? "actualizada" : "creada"} exitosamente.`
    );
    afterCrud();
    onClose();
  };

  const [form] = Form.useForm(); 
  return (
    <Form
      name="editarInmueble"
      layout={"vertical"}
      onFinish={onFinish}
      scrollToFirstError={true}
      form={form}
      initialValues={input ?? {}}
    >
      <Form.Item<InputInmueble> label="Descripción" name="descripcion">
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputInmueble>
        label="Matricula"
        name="matricula"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la matricula",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputInmueble>
        name="nomenclaturaCatastral"
        label="Nomenclatura Catastral"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la nomenclatura catastral",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>
      <Form.Item<InputInmueble> name="idDepartamento" label="Departamento">
         <DepartamentoComboBox style={{ width: "100%" }}    />
      </Form.Item>
      <Form.Item<InputInmueble> label="Ciudad" name="idCiudad">
        <CiudadComboBox style={{ width: "100%" }} />
      </Form.Item>

      <Flex gap="middle" justify="flex-end">
        <Button onClick={() => onClose()} danger>
          Cancelar
        </Button>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Flex>
    </Form>
  );
}
