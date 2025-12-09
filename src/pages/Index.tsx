import RpiLogo from "@components/layout/RpiLogo";
import config from "@config/config";

export default function Index() {
  return (
    <div className="container-layout items-center justify-center">
      <RpiLogo width={"250rem"} />
      <h2>Bienvenido a {config.appTitle}</h2>
    </div>
  );
}
