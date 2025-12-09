import { useQuery } from "@tanstack/react-query";
import { request } from "@utils/axiosInstance";
import { Select } from "antd";
import { DefaultOptionType, SelectProps } from "antd/es/select";

export default function DepartamentoComboBox(props: Readonly<SelectProps>) {
   const { data } = useQuery({
    queryKey: ["departamentos"],
    queryFn: () => request("/api/configuracion/departamentos"),
  });

  const options: DefaultOptionType[] =
    data?.map((item: DepartamentoDTO) => {
      return {
        value:  item.idDepartamento,
        label: item.codigo + " - " + item.descripcion.toUpperCase(),
      };
    }) ?? [];

  return (
    <div className="flex gap-2">
      <Select
        options={options}
        showSearch
        allowClear
        placeholder="Seleccione un departamento"
       // value={props.value}
        {...props}
      />
    </div>
  );
}
