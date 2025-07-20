# Projeto: Sorteio de Números com Persistência e Watchtower

Este projeto consiste em uma aplicação web que:
- Exibe um número sorteado a cada 20 segundos
- Armazena os números sorteados em um banco de dados MongoDB
- A cada 5 números sorteados, exibe um número aleatório já sorteado anteriormente
- Usa Docker e Watchtower para gerenciar e atualizar os containers

## 🔧 Pré-requisitos
- Docker instalado: https://www.docker.com/products/docker-desktop
- Docker Compose instalado

## 🚀 Como rodar o projeto

### 1. Copie o template de variáveis de ambiente
```bash
cp .env.template .env
```

### 2. Suba os containers
```bash
docker-compose up --build
```

### 3. Acesse a aplicação
- Frontend: http://localhost:8080
- Backend (API): http://localhost:3000
```

Você verá os números sendo sorteados a cada 5 segundos.

---

## 📦 Estrutura dos containers

- `frontend`: HTML + JS servido via Nginx
- `backend`: API Node.js conectando ao MongoDB
- `mongo`: Banco de dados MongoDB com persistência de dados
- `watchtower`: Observador que atualiza containers automaticamente (a cada 30s)

## 🔌 API Endpoints

- **POST /api/salvar**
  - Salva um número sorteado no banco
  - Corpo (JSON): `{ "valor": 42 }`

- **GET /api/numero-salvo**
  - Retorna um número aleatório já salvo no banco

## 📥 Persistência de dados
A persistência está garantida pelo volume Docker `mongo_data`. Os dados são mantidos mesmo que a máquina seja desligada.
