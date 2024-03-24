import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(prismaUserRepository);

  return useCase;
}
