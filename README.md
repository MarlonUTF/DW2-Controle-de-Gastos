# 💸 Controle de Gastos Pessoais

Este projeto é um sistema simples de gerenciamento financeiro desenvolvido em React, com integração ao Firebase para armazenamento de transações. Permite adicionar, editar e excluir transações financeiras, classificadas como entradas ou despesas, com categorias e subcategorias.

---

## 📌 Funcionalidades

- ✅ Cadastro, edição e exclusão de despesas  
- 🗂️ Organização por categorias: **fixas** (ex: aluguel, luz) e **variáveis** (ex: alimentação, transporte)  
- 🍔 Subgastos para categorias variáveis (ex: cantina, fast food)  
- 📊 Visualização gráfica dos dados com **Chart.js** ou **Recharts**  
- 🔄 Persistência de dados com **Firebase** e **LocalStorage**  
- 🤖 Assistente virtual (experimental) via **Gemini API**  
- 🔒 Armazenamento de sessão do usuário com LocalStorage  

---

## 🚀 Tecnologias Utilizadas

| Tecnologia       | Função                                                |
|------------------|------------------------------------------------------|
| React + Vite     | Interface e estrutura moderna do front-end           |
| Firebase         | Autenticação e banco de dados em nuvem (Firestore)   |
| Tailwind CSS     | Estilização rápida, responsiva e baseada em utilitários |
| date-fns | Formatação das Datas |
| LocalStorage     | Armazenamento local de sessões                        |
| Gemini API (a ser implementada)  | Chat de IA com sugestões de finanças                  |
| Chart.js / Recharts (a ser implementado)| Gráficos interativos de barras, pizza e linha      |

## Funcionalidades

- Cadastro de transações com descrição, valor, data, categoria, subcategoria e tipo (entrada ou despesa).
- Validações para garantir dados consistentes.
- Armazenamento em tempo real no Firebase Firestore.
- Feedback visual com alertas para sucesso e erros.
- Interface responsiva com Material-UI e Tailwind CSS.

---

## Estrutura do Firebase Firestore

Coleção: `transactions`

Cada documento representa uma transação e possui os seguintes campos:

| Campo        | Tipo       | Descrição                               |
|--------------|------------|---------------------------------------|
| `amount`     | Number     | Valor da transação                     |
| `categoria`  | String     | Categoria da transação (ex: alimentacao, fixo) |
| `createdAt`  | Timestamp  | Data de criação do documento           |
| `data`       | Timestamp  | Data da transação                      |
| `desc`       | String     | Descrição da transação                 |
| `expense`    | Boolean    | True se for despesa, False se entrada  |
| `subCategoria` | String   | Subcategoria (ex: feira, mercado)     |
| `userId`     | String     | ID do usuário que criou a transação   |

---

## Agradecimentos

Agradecimento aos canais [DD Solutions](https://www.youtube.com/@dd.solutions), [Willionário](https://www.youtube.com/@willionarios) e [Hora de Codar](https://www.youtube.com/@MatheusBattisti) do youtube, onde conseguimos aprender mais sobre firebase, CRUD no react e React Router, para assim aplicar essas tecnologias em nosso projeto

[Playlist do curso gratuito de firebase](https://www.youtube.com/playlist?list=PLba0a0QETkxzriEtyz2HfO-iQOQ7Ge_rO)
[Video de um projeto de finanças feito em react](https://www.youtube.com/watch?v=pj4vA67olbU)
[Aula de como utilizar o React Router ]()