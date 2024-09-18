# Etapa 1: Construcción
FROM node:18-alpine AS build
WORKDIR /app

COPY .env.production .env

COPY package*.json ./
COPY vite.config.js ./
COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./index.html

RUN npm install
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
