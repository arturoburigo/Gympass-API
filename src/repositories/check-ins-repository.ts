import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  findById(id: string): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
