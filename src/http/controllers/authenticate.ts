import { InvalidCredentialsError } from "@/errors/invalid-credentials-erros";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function authenticate(req: Request, res: Response) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase(); //Factory pattern

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      res.status(400).json(err.message);
    }
    throw err;
  }

  return res.status(200).json();
}
