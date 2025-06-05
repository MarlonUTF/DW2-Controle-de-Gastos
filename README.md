# 💸 Controle de Gastos Pessoais

Aplicação web desenvolvida com **React + Firebase** para ajudar usuários a registrarem, organizarem e visualizarem suas despesas mensais, com interface moderna e um assistente virtual integrado por IA (Gemini).

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
| LocalStorage     | Armazenamento local de sessões                        |
| Gemini API       | Chat de IA com sugestões de finanças                  |
| Chart.js / Recharts | Gráficos interativos de barras, pizza e linha      |

---

## 🧠 Estrutura de Dados (Firebase)

```json
{
  "users": {
    "uid123": {
      "despesas": {
        "despesaId1": {
          "nome": "Aluguel",
          "categoria": "Fixa",
          "valor": 1000,
          "data": "2025-06-01"
        },
        "despesaId2": {
          "nome": "Alimentação",
          "categoria": "Variável",
          "valorTotal": 500,
          "subgastos": {
            "sub1": {
              "nome": "Cantina",
              "valor": 200,
              "data": "2025-06-03"
            },
            "sub2": {
              "nome": "Fast Food",
              "valor": 300,
              "data": "2025-06-05"
            }
          }
        }
      }
    }
  }
}
