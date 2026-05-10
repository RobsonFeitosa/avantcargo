FROM node:22-alpine

WORKDIR /app

# Copia os arquivos de configuração do npm
COPY package*.json ./

# Instala as dependências
RUN npm install --legacy-peer-deps

# Copia o restante dos arquivos
COPY . .

# Expõe a porta que o Next.js usa
EXPOSE 3000

# No Dockerfile da pasta /web, altere a última linha para:
CMD ["npx", "next", "dev", "-p", "3000", "-H", "0.0.0.0"]