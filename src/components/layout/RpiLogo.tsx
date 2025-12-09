import escudoUrl from "./../../assets/rpi.png";

export interface RpiLogoProps {
  width?: number | string;
  height?: number | string;
}

export default function RpiLogo({ width = "100px", height = "100px" }: Readonly<RpiLogoProps>) {
  return (
    <img
      width={width}
      height={height}
      src={escudoUrl}
      alt="RPI - Poder Judicial de Neuquén"
      aria-label="Ir al Inicio"
    />
  );
}
