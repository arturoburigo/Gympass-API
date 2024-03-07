import { registerUseCase } from "@/use-cases/register";
import { Request, Response } from "express";
import { z } from "zod";

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(3),
  });

  const { email, password, name } = registerBodySchema.parse(req.body);

  try {
    await registerUseCase({ email, password, name });
  } catch (err){
    res.status(400).json();
  }

  return res.status(201).json({ message: "User created" });
}
