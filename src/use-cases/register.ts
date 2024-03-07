import { prisma } from "@/lib/prisma";
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUserCaseInterface {
  email: string;
  password: string;
  name: string;
}

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterUserCaseInterface) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("User already exists");
  }

  const password_hash = await hash(password, 8);

  const prismaUsersRepository = new PrismaUsersRepository();

  prismaUsersRepository.create({
    email,
    name,
    password_hash,
  });
}
