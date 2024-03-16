import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInsRepository, gymRepository);

    gymRepository.items.push({
      id: "gym-01",
      title: "Ironberg",
      description: "",
      latitude: new Decimal(40.764432),
      longitude: new Decimal(-74.1483874),
      phone: "",
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Should be able to check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 40.764432,
      userLongitude: -74.1483874,
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check-in twice on same day", async () => {
    jest.setSystemTime(new Date(2024, 2, 20, 9, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 40.764432,
      userLongitude: -74.1483874,
    });

    await expect(() =>
      sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: 40.764432,
        userLongitude: -74.1483874,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("Should  be able to check-in twice but on different days", async () => {
    jest.setSystemTime(new Date(2024, 2, 20, 9, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 40.764432,
      userLongitude: -74.1483874,
    });

    jest.setSystemTime(new Date(2024, 2, 21, 9, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 40.764432,
      userLongitude: -74.1483874,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check-in too much gym distance", async () => {
    gymRepository.items.push({
      id: "gym-02",
      title: "Ironberg",
      description: "",
      latitude: new Decimal(40.8126491),
      longitude: new Decimal(-74.091473),
      phone: "",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 40.764432,
        userLongitude: -74.1483874,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
