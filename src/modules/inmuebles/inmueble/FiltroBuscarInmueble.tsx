import { Button, Form, Input } from "antd";
import { FormProps, useWatch } from "antd/es/form/Form";

type FiltrosBuscarViewProps = {
  loading: boolean;
  onBuscar: (data: FiltrosInmueble) => void;
};

export default function FiltroBuscarInmuebles({ 
  onBuscar,
}: Readonly<FiltrosBuscarViewProps>) {

  const onFinish: FormProps<FiltrosInmueble>["onFinish"] = (values) => { 
    onBuscar(values);
  };

  const [form] = Form.useForm();
  const matricula = useWatch( "matricula" ,form);
  const nomenclaturaCatastral = useWatch(  "nomenclaturaCatastral"  ,form);
  return (
    <Form
      name="formBuscarInmuebles"
      form={form}
      className="!flex-row items-baseline flex-wrap !gap-y-2"
      onFinish={onFinish} 
      autoComplete="off"
    >
      <Form.Item<FiltrosInmueble> label="Matricula" name="matricula">
        <Input allowClear />
      </Form.Item>
      <Form.Item<FiltrosInmueble>
        label="Nomenclatura Catastral"
        name="nomenclaturaCatastral"
      >
        <Input allowClear style={{ width: "300" }} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!matricula && !nomenclaturaCatastral}>
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
}
