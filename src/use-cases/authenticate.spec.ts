import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-erros";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("Should be able to authenticate", async () => {
    await usersRepository.create({
      email: "burigoarturo3@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Arturo",
    });

    const { user } = await sut.execute({
      email: "burigoarturo3@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate w/ wrong e-mails", async () => {
    expect(
      async () =>
        await sut.execute({
          email: "burigoarturo3@gmail.com",
          password: "123456",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("Should not be able to authenticate w/ a wrong password", async () => {
    await usersRepository.create({
      email: "burigoarturo3@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Arturo",
    });

    expect(
      async () =>
        await sut.execute({
          email: "burigoarturo3@gmail.com",
          password: "122136",
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
