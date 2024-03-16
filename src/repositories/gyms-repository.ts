import { Gym } from "@prisma/client";

export interface GymRepositoryInterface {
  findById(id: string): Promise<Gym | null>;
}
