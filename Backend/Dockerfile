# Etapa 1: Construcción
FROM node:18-alpine
WORKDIR /app


COPY .env.production .env


COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001


CMD ["npm", "run", "start"]
