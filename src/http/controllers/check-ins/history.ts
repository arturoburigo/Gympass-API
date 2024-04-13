import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function history(req: Request, res: Response) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });
  const { page} = checkInHistoryQuerySchema.parse(req.query);
  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const {checkIns} = await fetchUserCheckInsHistoryUseCase.execute({ 
    page,
    userId: req?.user_id,
  });
  return res.status(200).send({checkIns});
}
