//----- Server Common Types
interface ListResult<T> {
  totalElements: number;
  elements: Array<T>;
}

interface DepartamentoDTO {
  id: number;
  codigo: string;
  descripcion: string;
  idDepartamento?: number;
}

interface CiudadDTO {
  id: number;
  codigo: string;
  descripcion: string;
  idDepartamento: number;
}

interface InputCiudad {
  id?: number;
  codigo: string;
  descripcion: string;
}

interface InputDepartamento {
  id?: number;
  codigo: string;
  descripcion: string;
}