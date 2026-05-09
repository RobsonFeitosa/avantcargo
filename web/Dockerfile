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

# Comando para rodar o Next.js em dev
CMD ["npm", "run", "dev"]