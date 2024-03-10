import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUserCaseInterface {
  email: string;
  password: string;
  name: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUserCaseInterface): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 8);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
