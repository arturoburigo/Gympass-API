import { CheckInUseCase } from "../checkin";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckinUseCase() {
  const prismaCheckInRepository = new PrismaCheckInsRepository();
  const prismaGymsRepository = new PrismaGymsRepository();
  const useCase = new CheckInUseCase(
    prismaCheckInRepository,
    prismaGymsRepository,
  );

  return useCase;
}
