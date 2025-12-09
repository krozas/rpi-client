import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import InmuebleViewForm from "./InmuebleViewForm";
import { request } from "@utils/axiosInstance";

export default function VerInmuebleContainer() {
  const { idInmueble } = useParams();
  console.log("🚀 ~ VerInmuebleContainer ~ idInmueble:", idInmueble)
  const [inmueble, setInmueble] = useState<InmuebleDTO>();

  const handleBuscarInmueble = async () => {
    if (Number(idInmueble)) {
      const data = await request("/api/inmueble", {
        id: idInmueble,
      });
      if (data) {
        setInmueble(data[0]);
      } 
    }
  };

  useEffect(() => {
    if (idInmueble) handleBuscarInmueble();
  }, [idInmueble]);

  return (
    <InmuebleViewForm inmueble={inmueble!} afterAccion={handleBuscarInmueble} />
  );
}
