# API de Despesas

API REST de estudos para cadastro de usuários e despesas, feita com **Express 5**, **TypeScript**, **Drizzle ORM** e **PostgreSQL**.

## Requisitos

- Node.js 20+
- PostgreSQL 14+

## Como rodar

```bash
npm install
cp .env.example .env    # ajuste a DATABASE_URL
npm run db:migrate      # cria as tabelas
npm run dev             # http://localhost:3000
```

Para produção: `npm run build && npm start`.

## Variáveis de ambiente

| Variável       | Descrição                        | Exemplo                                                  |
| -------------- | -------------------------------- | -------------------------------------------------------- |
| `DATABASE_URL` | String de conexão do PostgreSQL  | `postgresql://postgres:postgres@localhost:5432/api_despesas` |

## Scripts

| Script                | O que faz                                        |
| --------------------- | ------------------------------------------------ |
| `npm run dev`         | Sobe o servidor com reload automático             |
| `npm run build`       | Compila o TypeScript para `dist/`                 |
| `npm start`           | Roda o build de `dist/`                           |
| `npm run typecheck`   | Checa os tipos sem gerar arquivos                 |
| `npm run db:generate` | Gera uma migration a partir de `src/db/schema.ts` |
| `npm run db:migrate`  | Aplica as migrations no banco                     |

## Endpoints

### Usuários

| Método | Rota         | Corpo                        | Resposta                       |
| ------ | ------------ | ---------------------------- | ------------------------------ |
| GET    | `/user`      | —                            | `200` lista de usuários        |
| GET    | `/user/:id`  | —                            | `200` usuário / `404` não achado |
| POST   | `/user`      | `{ name, email, password }`  | `201` usuário / `409` e-mail duplicado |

A senha é armazenada com hash (bcrypt) e nunca é devolvida nas respostas.

### Despesas

| Método | Rota                      | Corpo                             | Resposta                         |
| ------ | ------------------------- | --------------------------------- | -------------------------------- |
| GET    | `/expenses`               | —                                 | `200` lista de despesas          |
| GET    | `/expenses/:id`           | —                                 | `200` despesa / `404` não achada  |
| GET    | `/expenses/user/:userId`  | —                                 | `200` despesas do usuário         |
| POST   | `/expenses`               | `{ description, amount, userId }` | `201` despesa / `404` usuário inexistente |

IDs inválidos retornam `400`.

## Estrutura

```
src/
  controllers/   validação da requisição e status HTTP
  repositories/  acesso ao banco via Drizzle
  routes/        definição das rotas do Express
  db/            conexão (index.ts) e schema das tabelas
  utils/         helpers compartilhados
drizzle/         migrations geradas pelo drizzle-kit
```
