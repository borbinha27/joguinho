# Projeto: Sorteio de Números com Persistência e Watchtower

Este projeto consiste em uma aplicação web que:
- Exibe um número sorteado a cada 5 segundos
- Armazena os números sorteados em um banco de dados MongoDB
- A cada 5 números sorteados, exibe um número aleatório já sorteado anteriormente
- Usa Docker e Watchtower para gerenciar e atualizar os containers

## 🔧 Pré-requisitos
- Docker instalado: https://www.docker.com/products/docker-desktop
- Docker Compose instalado

## 🚀 Como rodar o projeto

### 1. Clone ou copie os arquivos do projeto
Garanta que você tenha a seguinte estrutura:
```
numero-sorteado/
├── backend/
│   ├── Dockerfile
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── Dockerfile
│   └── index.html
├── docker-compose.yml
```

### 2. Abra o terminal na pasta `numero-sorteado/`
```bash
cd numero-sorteado
```

### 3. Construa e suba os containers com Docker Compose
```bash
docker-compose up --build
```

### 4. Acesse a aplicação
Abra o navegador e vá até:
```
http://localhost:8080
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
