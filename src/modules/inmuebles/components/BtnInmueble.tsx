import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export interface Props {
  id?: number | string;
  item?: any;
  onClick?: () => void;
}

export default function BtnInmueble({ 
  item, 
}: Readonly<Props>) {  

  const navigate = useNavigate();
  const { id  , descripcion } = item;  

  const handleClick = () => { 
     navigate(`/inmuebles/ver/${id}`);  
  };

  return (
    <Button
      id={`clave_${id}`}
      type={"link"} 
      className="font-semibold p-1"
      role="a"
      aria-label={`Ver Inmueble ${item.nomenclaturaCatastral}`}
      onClick={handleClick} 
    >
      {descripcion}
    </Button>
  );
}
