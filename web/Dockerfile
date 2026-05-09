# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir com Nginx (Eficiente para produção)
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Se usar React Router, você precisará de um arquivo nginx.conf customizado
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]