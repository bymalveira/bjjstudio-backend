import dotenv from "dotenv"; // Importa a biblioteca dotenv para carregar variáveis de ambiente do arquivo .env
dotenv.config(); // Carrega as variáveis definidas no arquivo .env para process.env

const PORT: number = parseInt(`${process.env.PORT || 3000}`); // Define a porta do servidor obtendo process.env.PORT ou 3000 como padrão e convertendo para número

import app from "./app"; // Importa a instância do aplicativo Express configurada no arquivo app.ts

app.listen(PORT, () => // Inicia o servidor HTTP escutando na porta especificada
  console.log(`Server is running at http://localhost:${PORT}`), // Exibe no console uma mensagem indicando que o servidor está rodando e a URL de acesso
); // Fecha a função de callback do app.listen

