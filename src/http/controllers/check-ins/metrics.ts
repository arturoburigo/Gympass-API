import { makeGetUserMetricsUseCase } from "@/use-cases/factories/make-get-user-metrics-use-case";
import { Request, Response } from "express";

export async function metrics(req: Request, res: Response) {

  const getUserMetricsUseCase = makeGetUserMetricsUseCase(); //Factory pattern
  const {checkInsCount} = await getUserMetricsUseCase.execute({
    userId: req?.user_id
  });

  return res.status(200).send({checkInsCount});
}
