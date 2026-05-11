FROM node:22-alpine

# Instala dependências nativas necessárias para compilar pacotes (como SWC ou bcrypt)
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (aproveita cache do Docker)
COPY package*.json ./

# Instala as dependências dentro do container
RUN npm install --legacy-peer-deps

# Copia o restante do código
COPY . .

RUN npm run build

# Expõe a porta que a API usa
EXPOSE 3333

# Comando para rodar em desenvolvimento com hot-reload
CMD ["npm", "run", "dev"]