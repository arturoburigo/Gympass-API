import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import {} from "@/repositories/in-memory/in-memory-users-repository";
import { CheckInUseCase } from "./checkin";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("Should be able to check-in", async () => {
    const { checkin } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkin.id).toEqual(expect.any(String));
  });
});
