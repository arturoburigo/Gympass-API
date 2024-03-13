import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("Should be able to find an user by Id", async () => {
    const createdUser = await usersRepository.create({
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
      name: "John Doe",
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("John Doe");
  });

  it("Should not be able to find users w/ wrond userId", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existing-user-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
