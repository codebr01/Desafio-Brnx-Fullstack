# 💼 Desafio BRNX

Sistema de gerenciamento de demandas técnicas com backend em Fastify, banco de dados PostgreSQL via Prisma ORM e frontend em React + Vite e Tailwind CSS.

---

### ✅ Pré-requisitos
- 🐳 [Docker](https://www.docker.com/) instalado e em execução

---

#### 📥 1. Clone o repositório

```bash
git clone https://github.com/codebr01/Desafio-BRNX.git
```

## ⚙️ Configurando variaveis de ambiente:

### 🛠️ Passo a passo

#### 1. Dentro da pasta do projeto "Desafio-BRNX", crie um arquivo .env com o mesmo conteudo do arquivo .env.example.

```bash
POSTGRES_DB=NOME_DO_SEU_BANCO_DE_DADOS
POSTGRES_USER=SEU_USUARIO
POSTGRES_PASSWORD=SUA_SENHA
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@db:5432/NOME_DO_SEU_BANCO_DE_DADOS?schema=public
```

#### 2. Depois, crie o arquivo .env dentro da basta "backend" com o mesmo conteudo do arquivo .env.example.

```bash
DATABASE_URL=postgresql://SEU_USUARIO:SUA_SENHA@db:5432/NOME_DO_SEU_BANCO_DE_DADOS?schema=public
PORT=SUA_PORTA | Ex: 3333
```

#### 3. Por fim, crie o arquivo .env dentro da basta "frontend" com o mesmo conteudo do arquivo .env.example.

```bash
VITE_BASE_URL_API=http://localhost:PORTA_USADA_NO_ARQUIVO_USADO_NO_ENV_DO_BACKEND
```

## 🚀 Como rodar o projeto

### 🛠️ Passo a passo

#### 📂 1. Acesse a pasta do projeto

```bash
cd Desafio-BRNX
```

#### 🐋 2. Suba a aplicação com Docker

```bash
docker compose up --build
```

---

### 🌐 Acesse no navegador

- 💻 Frontend: [http://localhost:5173/demands](http://localhost:5173/demands)

> 🧪 Dados de teste são gerados automaticamente via `prisma/seeder.ts` ao subir o container do backend.

---

## 📁 Estrutura do projeto

```bash
codebr01-desafio-brnx/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seeder.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── server.ts
│   │   └── routes/
├── frontend/
│   ├── Dockerfile
│   └── src/
│       ├── pages/
│       └── components/
```

---

## 🧠 Tecnologias

- 🧩 **Backend**: Node.js, Fastify, Prisma ORM
- 🖼️ **Frontend**: React, Vite, TailwindCSS
- 🛢️ **Banco de dados**: PostgreSQL
- 🐳 **Containers**: Docker + Docker Compose

---

## 👨‍💻 Autor

Feito com 💙 por [@codebr01](https://github.com/codebr01)
