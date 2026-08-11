import "dotenv/config"; // Importa a inicialização do dotenv para carregar as variáveis de ambiente antes da conexão com o banco
import { PrismaPg } from "@prisma/adapter-pg"; // Importa o adaptador do Prisma para conexão de banco PostgreSQL via driver pg
import { PrismaClient } from "../../generated/prisma/client"; // Importa o cliente do Prisma gerado a partir do schema de banco de dados

const connectionString = `${process.env.DATABASE_URL}`; // Obtém a URL de conexão com o banco de dados a partir da variável de ambiente DATABASE_URL

const adapter = new PrismaPg({ connectionString }); // Instancia o adaptador PrismaPg configurado com a string de conexão
const prisma = new PrismaClient({ adapter }); // Instancia o PrismaClient utilizando o adaptador customizado do PostgreSQL

export { prisma }; // Exporta a instância única do Prisma para ser utilizada nas chamadas do banco de dados em toda a aplicação

