# Etapa 1: Construir el proyecto Node-React usando Bun
FROM node:20-alpine3.18 AS build
WORKDIR /app

# Copiar el archivo .npmrc
COPY .npmrc ./

# Copiar y instalar dependencias usando Bun
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto y construirlo
COPY . .
RUN npm run build || { echo "Build failed!"; exit 1; }

# Etapa 2: Configurar Nginx para servir la aplicación
FROM nginx:alpine AS deploy

# Copiar los archivos construidos desde la etapa anterior
COPY --from=build ./app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# Copiar archivo de configuración de Nginx
COPY ./nginx.conf /etc/nginx/conf.d
