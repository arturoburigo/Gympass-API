import { makeCheckinUseCase } from "@/use-cases/factories/make-checkin-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function create(req: Request, res: Response) {
    const createCheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    });

    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude:z.number().refine((value) => {
            return Math.abs(value) <= 180;
        })
    });
    const {latitude,longitude} = createCheckInBodySchema.parse(req.body);
    const {gymId} = createCheckInParamsSchema.parse(req.params);
    const createCheckInUseCase = makeCheckinUseCase();
    await createCheckInUseCase.execute({ 
        gymId,
        userId: req?.user_id,
        userLatitude: latitude,
        userLongitude: longitude
    });

    return res.status(201).send();
}
