import { ButtonEliminar } from "@dgipjn/antd-components";
import useFiltroVista from "@hooks/usuario/useFiltroVista";
import useGestionPreferencias from "@hooks/usuario/useGestionPreferencias";

declare interface Props<T = any> {
  nombreVista: string;
  disabled: boolean;
  filtroSelected: FiltroUsr<T> | undefined;
}

export default function DeleteFiltro<T>({
  nombreVista,
  disabled,
  filtroSelected,
}: Readonly<Props<T>>) {
  const { setFiltroVista } = useFiltroVista<T, FiltroUsr<T>>(nombreVista);

  const { handleOperacion } = useGestionPreferencias({
    operacionId: "delete",
    successMessage: "Filtro eliminado correctamente.",
  });

  const handleOnConfirm = async () => {
    const exito = await handleOperacion({
      id: filtroSelected!.id,
      accion: "filtro",
      vista: nombreVista,
    });

    if (exito) {
      setFiltroVista(undefined);
    }
  };

  return (
    <ButtonEliminar
      disabled={disabled}
      contentProps={{
        title: "Eliminar Filtro",
        content: `¿Está seguro de eliminar el filtro '${filtroSelected?.nombre}'?`,
        onConfirm: handleOnConfirm,
      }}
    />
  );
}
