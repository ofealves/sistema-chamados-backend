# Nexou API — Backend

API RESTful do sistema de chamados Nexou, desenvolvida com Node.js, Express, TypeScript e MongoDB.

🔗 **Frontend:** https://sistema-chamados-kappa.vercel.app  
🔗 **Repositório Frontend:** https://github.com/ofealves/sistema-chamados

---

## Sobre

Backend construído do zero para suportar um sistema administrativo de abertura e acompanhamento de chamados técnicos.

O projeto foi desenvolvido com foco em aprendizado real — cada decisão de arquitetura foi tomada com entendimento do porquê, sem copiar tutoriais prontos.

---

## Tecnologias

- **Node.js** com **Express**
- **TypeScript**
- **MongoDB** com **Mongoose**
- **JWT** para autenticação
- **bcrypt** para hash de senha
- **Railway** para deploy
- **MongoDB Atlas** para banco em produção

---

## Funcionalidades

- Cadastro e login de usuários com JWT
- Hash de senha com bcrypt — nunca armazenada em texto puro
- Middleware de autenticação protegendo todas as rotas de tickets
- Middleware de autorização por role — só admin pode atualizar e deletar tickets
- CRUD completo de tickets
- Separação por camadas: routes → middleware → controller → model

---

## Arquitetura

src/
├── config/
│   └── db.ts              # Conexão com MongoDB
├── middleware/
│   ├── auth.ts            # Verifica JWT
│   └── adminAuth.ts       # Verifica role de admin
├── modules/
│   ├── tickets/
│   │   ├── ticket.model.ts
│   │   ├── ticket.controller.ts
│   │   └── ticket.routes.ts
│   └── users/
│       ├── user.model.ts
│       ├── user.controller.ts
│       └── user.routes.ts
└── server.ts

---

## Rotas

### Autenticação
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastro de usuário |
| POST | /auth/login | Login — retorna JWT |

### Tickets
| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| GET | /tickets | Lista todos os tickets | ✅ |
| GET | /tickets/:id | Detalhe de um ticket | ✅ |
| POST | /tickets | Cria novo ticket | ✅ |
| PATCH | /tickets/:id | Atualiza status | ✅ Admin |
| DELETE | /tickets/:id | Remove ticket | ✅ Admin |

---

## Como rodar localmente

Clone o repositório:

```bash
git clone https://github.com/ofealves/sistema-chamados-backend.git
cd sistema-chamados-backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz:

```env
MONGO_URL=sua_connection_string_do_mongodb
JWT_SECRET=sua_chave_secreta
PORT=5000
```

Inicie o servidor:

```bash
npm run dev
```

---

## Decisões técnicas

**Por que JWT?**  
Autenticação stateless — o servidor não precisa armazenar sessão. O token carrega o `_id` e o `role` do usuário, disponíveis em qualquer requisição via middleware.

**Por que bcrypt?**  
Senhas nunca são salvas em texto puro. O bcrypt gera um hash irreversível — mesmo que o banco seja comprometido, as senhas ficam protegidas.

**Por que middleware separado para admin?**  
Separação de responsabilidades. O `auth` verifica se o usuário está autenticado. O `adminAuth` verifica se tem permissão. Cada arquivo faz uma coisa só.

---

## Autor

Desenvolvido por Felipe Alves  
[LinkedIn](https://www.linkedin.com/in/oifelipealves/) · [Portfólio](https://portfolio-two-delta-w8vbs00b29.vercel.app/)

---

## Arquitetura
