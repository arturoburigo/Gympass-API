import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
      name: "John Doe",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registrations", async () => {
    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
      name: "John Doe",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it("Should not be able to register same email twice", async () => {
    await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
      name: "John Doe",
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
        name: "John Doe",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
