import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { configuracionRoutes } from "@modules/configuracion/routes";
import { inmueblesRoutes } from "@modules/inmuebles/routes";
import { MenuProps } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

export function getSideBarItems() {
  //TODO: Actualizar con codigo por preferencias cuando sea necesario
  const items = [];

  let subItems = [];
  const configuracion = configuracionRoutes;
  if (configuracion) {
    for (const item of configuracion.children) {
      if (item.path) {
        subItems.push({
          icon: item.icon ?? undefined,
          label: item.path,
          url: item.path ? `/configuracion/${item.path}` : "/configuracion",
        });
      }
    }
    items.push({
      icon: SettingOutlined,
      label: "Configuración",
      key: "/configuracion",
      children: subItems,
    });
  }
  const inmuebles = inmueblesRoutes;
  if (inmuebles) {
    subItems = [];
    for (const item of inmuebles.children) { 
      if (item.path && !item.path.startsWith("ver/:idInmueble")) {
        subItems.push({
          icon: item.icon ?? undefined,
          label: item.path,
          url: item.path ? `/inmuebles/${item.path}` : "/inmuebles",
        });
      }
    }

    items.push({
      icon: HomeOutlined,
      label: "Inmuebles",
      key: "/inmuebles",
      children: subItems,
    });
  }

 
  const itemsAntd: MenuProps["items"] = items.map((item) => {
    return {
      key: item.key,
      icon: React.createElement(item.icon),
      label: item.label,

      children: item.children?.map((child) => {
        return {
          key: child.url,
          label: <NavLink to={child.url}>{child.label}</NavLink>,
          icon: child.icon ?? undefined,
        };
      }),
    };
  });
  return itemsAntd;
}
