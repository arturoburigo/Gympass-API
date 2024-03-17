import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { CreateGymUseCase } from "./create-gym";

let gymRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("Should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "Ironberg",
      description: "",
      latitude: 40.764432,
      longitude: -74.1483874,
      phone: "",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
