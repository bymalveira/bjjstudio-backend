import * as z from "zod"; // Importa a biblioteca Zod para criar e manipular schemas de validação
import type { Request, Response, NextFunction } from "express"; // Importa os tipos Request, Response e NextFunction do Express

export function validate(schema: z.ZodType) { // Declara e exporta a função middleware validate que recebe um schema Zod como parâmetro
  return (req: Request, res: Response, next: NextFunction) => { // Retorna a função de middleware assíncrona/síncrona compatível com Express
    const data = schema.safeParse(req.body); // Executa a validação do req.body de forma segura (sem lançar exceções) usando o schema Zod

    if (!data.success) { // Verifica se a validação do corpo da requisição falhou
      return res.status(400).json(data.error.flatten()); // Caso falhe, retorna status HTTP 400 (Bad Request) com a lista formatada de erros de validação
    } // Encerra o bloco condicional de erro de validação

    (req as any).validatedData = data.data; // Armazena os dados validados e tipados na propriedade validatedData da requisição para ser consumido posteriormente pelos controllers

    next(); // Chama a próxima função da cadeia de middlewares/controllers do Express
  }; // Encerra a função middleware de retorno
} // Encerra a função principal validate

