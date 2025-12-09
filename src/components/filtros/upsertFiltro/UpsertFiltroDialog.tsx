import EditFilled from "@ant-design/icons/EditFilled";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { CustomForm, CustomModal, FormActions, IconTextButton } from "@dgipjn/antd-components";
import { useCustomForm } from "@dgipjn/antd-components/hooks";
import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import { useState } from "react";

declare interface Props<T> {
  disabledSaveFiltro: boolean;
  disabledEditFiltros: boolean;
  inputFiltro: FiltroUsr<T> | undefined;
  onSaveFiltro: (data: GuardarFiltroFormType, isEditar: boolean) => void;
}

export type GuardarFiltroFormType = {
  nombre: string;
};

const rules: { [key in keyof GuardarFiltroFormType]?: Rule[] } = {
  nombre: [{ required: true, message: "Ingrese el nombre para del filtro.", type: "string" }],
};

export default function UpsertFiltroDialogView<T>({
  disabledSaveFiltro,
  disabledEditFiltros,
  inputFiltro,
  onSaveFiltro,
}: Readonly<Props<T>>) {
  const [opened, setOpened] = useState(false);
  const [isEditar, setIsEditar] = useState(false);
  const onClose = () => setOpened(false);

  const handleOpen = (tipo: string) => {
    const isEditarAux = tipo === "editar";
    setOpened(true);
    setIsEditar(isEditarAux);

    if (isEditarAux) {
      form.setFieldsValue({ nombre: inputFiltro?.nombre ?? "" });
    }
  };

  const { formProps, handleCloseForm, isSubmitting } = useCustomForm<GuardarFiltroFormType>({
    name: "UpsertFiltroDialogForm",
    onSubmit: (data) => onSaveFiltro(data, isEditar),
    onCloseForm: onClose,
  });
  const { form } = formProps;

  return (
    <>
      <IconTextButton
        icon={<EditFilled />}
        tooltip="Actualizar filtro"
        disabled={disabledEditFiltros}
        onClick={() => handleOpen("editar")}
      />
      <IconTextButton
        icon={<PlusOutlined />}
        tooltip="Guardar filtro"
        variant="success"
        disabled={disabledSaveFiltro}
        onClick={() => handleOpen("guardar")}
      />
      <CustomModal
        open={opened}
        title={`${isEditar ? "Editar" : "Guardar"}  filtro`}
        onCancel={handleCloseForm}
        footer={null}
      >
        {isEditar ? (
          <p>
            Si desea puede cambiar el nombre del filtro.
            <br />
            <b>NOTA:</b> Al guardar se sobrescribirá el filtro actual.
          </p>
        ) : (
          <p>Ingrese el nombre del filtro configurado para guardarlo.</p>
        )}
        <CustomForm<GuardarFiltroFormType> {...formProps}>
          <Form.Item name="nombre" label="Nombre del Filtro" rules={rules.nombre}>
            <Input />
          </Form.Item>
          <FormActions
            onCancelar={handleCloseForm}
            loading={isSubmitting}
            className="mt-8"
            txtGuardar={isEditar ? "Actualizar" : "Crear"}
            messageOnOkConfirm={isEditar ? "Está seguro de editar el filtro?" : ""}
          />
        </CustomForm>
      </CustomModal>
    </>
  );
}
