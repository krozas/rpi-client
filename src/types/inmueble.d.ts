interface InmuebleDTO {
  id: number;
  nomenclaturaCatastral: string;
  matricula: string;
  telefono: string;
  bienDeFamilia: boolean; 
  descripcion: string;
  codigoDepartamento: any;
  codigoCiudad: any;
}

interface FiltrosInmueble {
  matricula?: string;
  nomenclaturaCatastral?: string; 
  idInmueble?: number;
}   

interface InputInmueble {
  nomenclaturaCatastral: string;
  matricula: string;
  telefono: string;
  descripcion: string;
  bienDeFamilia: boolean; 
  idDepartamento: number;
  idCiudad: number;
  id: number;
}