import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function validate(req: Request, res: Response) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    });
    const {checkInId} = validateCheckInParamsSchema.parse(req.params);
    const validateCheckInUseCase = makeValidateCheckInUseCase();
    await validateCheckInUseCase.execute({ 
        checkInId
    });

    return res.status(204).send();
}
