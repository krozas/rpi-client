# DGI React Seed

Proyecto base para el desarrollo de aplicaciones React con TypeScript.

## Variables de entorno:
Para utilizar las variables de entorno:
1. Cambiar el archivo `.env.example` a `.env`.
2. Modificar todos los valores `react-seed` y los que sean necesarios a los valores correspondientes a tu proyecto.
3. **NOTA:** No olvidar modificar el puerto de despliegue de la app con la variable `APP_PORT`.

### Ejecutar
```
npm i
npm run dev
```

### Despliegue
1. Modificar el archivo `infrastructure/drone/drone.yml` con los valores correspondientes a tu proyecto.
2. Ingresar en [drone](https://drone2.jusneuquen.gov.ar/) y autenticarse con Github.
3. Habilitar el proyecto en drone buscando el repositorio correspondiente.
4. En las settings del proyecto, cambiar el campo **Configuration** por `infrastructure/.drone.yml` para que se pueda leer la configuracion de drone correctamente.
5. Luego hacer un commit a `staging o master` y verificar que la app quede desplegada correctamente.
6. Listo! Tu aplicación está lista! :)

## Dependencias:
* Tailwindcss [Link](https://tailwindcss.com)
* AntDesign [Link](https://ant.design/docs/react/introduce)
* React-Router [Link](https://reactrouter.com/en/6.25.1)
* KeycloakJs [Link](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
* Zustand [Link](https://docs.pmnd.rs/zustand/getting-started/introduction)
