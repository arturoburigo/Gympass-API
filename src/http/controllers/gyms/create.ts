import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
  const createGymBodySchema = z.object({
    title: z.string().min(5),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90;
    }),
    longitude:z.number().refine((value) => {
        return Math.abs(value) <= 180;
    })
  });
  const { description,latitude,longitude,phone,title} = createGymBodySchema.parse(req.body);
  const createGymUseCase = makeCreateGymUseCase();
  const gym = await createGymUseCase.execute({ description, latitude, longitude, phone, title });

  return res.status(201).send(gym);
}
