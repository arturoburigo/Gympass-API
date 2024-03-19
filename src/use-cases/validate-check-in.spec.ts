import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { LateCheckInValidationError } from "@/errors/late-check-in-validation-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutos of its creation", async () => {
    jest.setSystemTime(new Date(2024, 0, 1, 8, 0));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinInMs = 1000 * 60 * 21;

    jest.advanceTimersByTime(twentyOneMinInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
