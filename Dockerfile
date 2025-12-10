#etapa de compilacion
ARG NODE_VERSION=23.11.0
FROM node:${NODE_VERSION}-alpine AS build-stage

# Declaro las variables
ENV DIR=/rpi-client

# Creo el directorio en el contenedor
WORKDIR ${DIR}

# Copy package.json and package-lock.json to the working directory 
COPY package*.json ./

# Install dependencies 
RUN npm install 


# Copiar el resto del proyecto y construirlo
COPY . . 
RUN npm run build


# etapa de producción
FROM nginx:1.17.10-alpine AS production-stage

COPY --from=build-stage /rpi-client/dist /usr/share/nginx/html

EXPOSE 9001

# Expose the port that the application listens on.
#EXPOSE 9001

# Run the application.
CMD ["nginx", "-g", "daemon off;"]

