import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function makeGetUserMetricsUseCase() {
  const prismaCheckinRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(prismaCheckinRepository);

  return useCase;
}
