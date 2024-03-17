import { Gym, Prisma } from "@prisma/client";

export interface GymRepositoryInterface {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
