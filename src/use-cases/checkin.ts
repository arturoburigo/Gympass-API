import { CheckInsRepositoryInterface } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkin: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkin = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkin,
    };
  }
}
