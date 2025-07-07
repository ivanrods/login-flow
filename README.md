# 📘 loginFlow

Aplicação full stack com autenticação de usuários utilizando React, Node.js e MongoDB. Permite cadastro, login, edição de perfil, alteração de avatar e exclusão de conta.

---

## 🚀 Demonstração

> [![Ver Demo](https://img.shields.io/badge/Demo-Ao%20vivo-blue?style=for-the-badge&logo=vercel)](https://login-flow.vercel.app/)  

---

## 🧩 Funcionalidades

- ✅ Cadastro de usuários com validação de campos
- 🔐 Login com autenticação via JWT
- 🔒 Proteção de rotas privadas
- 📝 Edição de perfil com avatar dinâmico
- ❌ Exclusão de conta com confirmação
- 🔁 Logout
- 🎉 Toasts de sucesso e erro (feedback visual)
- 🛡️ Validação com React Hook Form + Yup

---

## 📷 Imagem da interface

> ![Screenshot From 2025-07-07 11-31-34](https://github.com/user-attachments/assets/70f25485-0d8f-4b11-b753-a56d75241ed0)


---

## 🛠️ Tecnologias utilizadas

### Front-end
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- CSS Modules

### Back-end
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [Bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

---

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/ivanrods/login-flow.git

# Acesse a pasta do projeto
cd login-flow

# Instale as dependências do front-end
cd client
npm install
npm run dev

# Instale as dependências do back-end
cd server
npm install
npm run dev
