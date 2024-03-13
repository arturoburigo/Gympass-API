import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { UsersRepositoryInterface } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user,
    };
  }
}
