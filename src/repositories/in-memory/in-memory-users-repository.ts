import { Prisma, User } from "@prisma/client";
import { UsersRepositoryInterface } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: "user-1",
      created_at: new Date(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
    };

    this.items.push(user);

    return user;
  }
}
