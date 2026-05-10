# AvantCargo - Fullstack Software Architecture

Este projeto utiliza uma arquitetura baseada em microserviços dockerizados, separando as responsabilidades de Frontend (Next.js), Backend (NestJS), Banco de Dados (PostgreSQL) e Proxy Reverso (Nginx).

## 🚀 Estrutura de Ambientes

O projeto utiliza a estratégia de **Multiple Compose Files** para garantir que o ambiente de desenvolvimento seja produtivo e o de produção seja otimizado.

### 🛠️ Desenvolvimento (Local)
No ambiente local, utilizamos volumes para permitir o *Hot Reload*.
- **Comando:** `docker compose up -d --build`
- **O que acontece:** O Docker utiliza o `docker-compose.yml` + `docker-compose.override.yml`. O Frontend e Backend rodam em modo `dev`.

### 🌐 Produção (VPS)
Em produção, focamos em performance e baixo consumo de recursos (ideal para VPS com 2GB RAM).
- **Comando:** `docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build`
- **O que acontece:** O Next.js executa o `build` estático e roda via `start`. O consumo de memória cai drasticamente e o tempo de resposta é imediato.

---

## 🏗️ Arquitetura de Rede

A comunicação externa é centralizada no **Nginx** (Porta 80), que atua como Proxy Reverso:
- Requisições para `/` -> Encaminhadas para o container `web:3000` (Next.js).
- Requisições para `/api` -> Encaminhadas para o container `api:3333` (NestJS).



---

## ⚙️ Requisitos da VPS

Para rodar este stack em uma VPS de entrada (2GB RAM), é **obrigatório** configurar um arquivo de SWAP para evitar travamentos durante o build do Next.js:

```bash
# Criando 2GB de Swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab