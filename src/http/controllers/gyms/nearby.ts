import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { Request, Response } from "express";
import { z } from "zod";

export async function nearby(req: Request, res: Response) {
  const nearbyGymBodySchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180)
  });

  // Assegura que latitude e longitude não são undefined e são convertidos para números
  const queryParams = {
    latitude: typeof req.query.latitude === "string" ? parseFloat(req.query.latitude) : undefined,
    longitude: typeof req.query.longitude === "string" ? parseFloat(req.query.longitude) : undefined
  };

  if (queryParams.latitude === undefined || queryParams.longitude === undefined) {
    return res.status(400).send({ error: "Latitude and longitude must be provided as query parameters" });
  }

  // Agora parseamos os queryParams
  const { latitude, longitude } = nearbyGymBodySchema.parse(queryParams);

  const nearbyGymUseCase = makeFetchNearbyGymsUseCase(); // Factory pattern
  const { gyms } = await nearbyGymUseCase.execute({ userLatitude: latitude, userLongitude: longitude });

  return res.status(200).send({
    gyms,
  });
}
