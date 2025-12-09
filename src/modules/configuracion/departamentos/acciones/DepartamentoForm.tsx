import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { Button, Flex, Form, FormProps, Input, message } from "antd";

interface Props {
  input?: InputDepartamento;
  onClose: () => void;
  afterCrud: () => void;
}

export default function DepartamentoForm({
  input,
  onClose,
  afterCrud,
}: Readonly<Props>) {
  const [upsertDepartamento] = useQuery<number>((inputDepartamento: any) =>
    request("/api/configuracion/departamentos/save", inputDepartamento)
  );

  const onFinish: FormProps<InputDepartamento>["onFinish"] = async (values) => {
    values.id = input?.id ?? 0;
    await upsertDepartamento(values);
    message.success(
      `Departamento ${values.id ? "actualizado" : "creado"} exitosamente.`
    );
    afterCrud();
    onClose();
  };

  return (
    <Form
      name="editarDepartamento"
      onFinish={onFinish}
      layout={"vertical"}
      scrollToFirstError={true}
      initialValues={input ?? {}}
    >
      <Form.Item<InputDepartamento>
        label="Código"
        name="codigo"
        rules={[
          {
            required: true,
            message: "Por favor ingrese el codigo",
          },
        ]}
      >
        <Input allowClear />
      </Form.Item>

      <Form.Item<InputDepartamento>
        label="Descripción"
        name="descripcion"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la descripcion",
          },
        ]}
      >
        <Input allowClear />
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
