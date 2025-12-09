import useGestionPreferencias from "@hooks/usuario/useGestionPreferencias";
import { message } from "antd";
import UpsertFiltroDialogView, { GuardarFiltroFormType } from "./UpsertFiltroDialog";

declare interface Props<T> {
  nombreVista: string;
  filtroSelected: FiltroUsr<T> | undefined;
  filtrosUsrVista: FiltroUsr<T>[];
  disabledSaveFiltro: boolean;
  disabledEditFiltros: boolean;
  setFiltroVista: (filtro: FiltroUsr<T>) => void;
}

export default function UpsertFiltroDialogContainer<T>({
  nombreVista,
  filtroSelected,
  filtrosUsrVista,
  disabledSaveFiltro,
  disabledEditFiltros,
  setFiltroVista,
}: Readonly<Props<T>>) {
  const { handleOperacion } = useGestionPreferencias({ operacionId: "savePreferencia" });

  const handleSaveFiltro = async (data: GuardarFiltroFormType, isEditar: boolean) => {
    let filtro = { ...filtroSelected, ...data };

    if (!isEditar) {
      //El timestamp es el id del filtro
      filtro.id = Date.now();
    }

    const encontrado = filtrosUsrVista.some(
      (item) => item.id !== filtroSelected?.id && item.nombre === data.nombre
    );

    if (encontrado) {
      message.error(
        `Ya existe un filtro con el nombre: '${data.nombre}'. Puede ingresar otro nombre o editar el filtro anterior.`
      );
      return false;
    }

    const exito = await handleOperacion(
      {
        filtro,
        vista: nombreVista,
        accion: "filtro",
      },
      {
        successMesssage: `Filtro ${isEditar ? "actualizado" : "guardado"} exitosamente.`,
      }
    );

    if (exito) {
      //@ts-ignore siempre viene el id, si es editado ya lo tiene, si es creado le creo un id al principio
      //Del merge entre GuardarFiltroFormType y FiltroUsr<T> obtiene el warning de id undefined que es requerido en FitrloUsr<T>
      setFiltroVista(filtro);
    }

    return exito;
  };

  return (
    <UpsertFiltroDialogView
      inputFiltro={filtroSelected}
      disabledSaveFiltro={disabledSaveFiltro}
      disabledEditFiltros={disabledEditFiltros}
      onSaveFiltro={handleSaveFiltro}
    />
  );
}
