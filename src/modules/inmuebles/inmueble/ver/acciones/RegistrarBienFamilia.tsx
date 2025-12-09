import { CheckOutlined } from "@ant-design/icons";
import { useQuery } from "@hooks/useQuery";
import { request } from "@utils/axiosInstance";
import { message, Modal, notification } from "antd";

declare interface Props {
  inmueble: InmuebleDTO;
  afterCrud: () => void;
}

const showPromiseConfirm = (onConfirm: () => Promise<void>) => {
  Modal.confirm({
    title: "Registrar Inmueble",
    content:
      "¿Está seguro que desea registrar el inmueble como bien de familia?",
    onOk: onConfirm,
    okCancel: true,
  });
};

export default function RegistrarBienFamilia({
  inmueble,
  afterCrud,
}: Readonly<Props>) {
  const [upsertInmueble] = useQuery<number>((inputInmueble: any) =>
    request("/api/inmueble/save", inputInmueble)
  );
  const [posibleRegistrar] = useQuery((filtros: FiltrosInmueble) =>
    request(`/api/inmueble/esPosibleRegistrar`, filtros)
  );

  const handleRegistrarBien = async () => {
    try {
      inmueble.bienDeFamilia = true;
      await upsertInmueble(inmueble);
    } catch (e: any) {
      message.error(
        e.message ??
          "Ocurrió un error al eliminar al registrar el inmueble. Intente nuevamente o comuníquese con soporte."
      );
    }
  };

  const handleCheckAndRegistrar = async () => {
    const { data } = await posibleRegistrar(inmueble); 
    if (data.exito) {
      await handleRegistrarBien();
      message.success(data.mensaje + ` Matricula ${inmueble.matricula}.`);
      afterCrud();
    } else {
      notification["error"]({
        message: "No se registro el inmueble como bien de familia",
        description: data.mensaje,
        duration: 180,
        placement: "topRight",
      });
    }
  };

  return (
    <button
      className={"flex items-center gap-2"}
      style={{ width: "100%" }}
      onClick={() => showPromiseConfirm(handleCheckAndRegistrar)}
      type="button"
    >
      {<CheckOutlined />}
      <span>Registrar como bien de familia</span>
    </button>
  );
}
