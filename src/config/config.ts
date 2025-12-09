const {
  VITE_APP_TITLE,
  VITE_APP_BASE_URL,
  VITE_SERVER_URL
} = import.meta.env;


export default {
  appTitle: VITE_APP_TITLE ?? "Nueva Aplicación",
  baseUrl: VITE_APP_BASE_URL ? `/${VITE_APP_BASE_URL}` : "/",
  serverUrl: VITE_SERVER_URL,
};

export const PAGE_SIZES = [30, 40, 50];
export const FULL_PAGE_SIZES = [10, 20, 30, 40, 50];

export const LOGIN_MODE = {
  LOGIN_REQUIRED: "login-required",
  LOGIN_OPTIONAL: "login-optional",
}
