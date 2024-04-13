import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function search(req: Request, res: Response) {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page,q} = searchGymsQuerySchema.parse(req.query);
  const searchGymUseCase = makeSearchGymsUseCase(); //Factory pattern
  const {gyms} = await searchGymUseCase.execute({ page,query: q });

  return res.status(200).send({gyms});
}
