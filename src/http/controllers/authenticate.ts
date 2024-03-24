import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { Request, Response, response } from "express";
import { sign } from "jsonwebtoken";
import { z } from "zod";

export async function authenticate(req: Request, res: Response) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase(); //Factory pattern

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: "30d",
    });

    return res.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      res.status(400).json(err.message);
    }
    throw err;
  }
}
