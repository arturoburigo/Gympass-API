import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepositoryInterface {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
