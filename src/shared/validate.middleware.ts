import * as z from "zod"; // {/* importa o zod pra usar o tipo genérico de schema */}
import type { Request, Response, NextFunction } from "express"; // {/* tipos do express usados na assinatura do middleware */}

export function validate(schema: z.ZodType) {
  // {/* "fábrica" de middleware: recebe um schema qualquer e devolve a função handler pronta */}
  return (req: Request, res: Response, next: NextFunction) => {
    const data = schema.safeParse(req.body); // {/* valida o body da requisição contra o schema recebido */}

    if (!data.success) {
      // {/* se a validação falhar, responde 400 com os detalhes do erro e PARA aqui (não chama next) */}
      return res.status(400).json(data.error.flatten());
    }

    (req as any).validatedData = data.data; // {/* guarda o dado já validado/limpo no req, pro controller usar depois (as any pq Request não conhece essa propriedade por padrão) */}

    next(); // {/* passa a bola pro próximo handler da rota (o controller) */}
  };
}
