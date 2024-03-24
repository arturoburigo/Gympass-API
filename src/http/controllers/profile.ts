import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";
import { Request, Response } from "express";

export async function profile(req: Request, res: Response) {
  const userId = req?.user_id;

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({ userId });

  return res.json({ user });
}
