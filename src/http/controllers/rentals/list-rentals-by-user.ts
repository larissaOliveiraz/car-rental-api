import { Request, Response } from "express";
import { makeListRentalsByUserService } from "../../../services/rentals/factories/make-list-rentals-by-user-service";
import { UserNotFoundError } from "../../../errors/users/UserNotFoundError";

export async function listRentalsByUser(request: Request, response: Response) {
  const { id } = request.user;

  try {
    const service = makeListRentalsByUserService();
    const rentals = await service.execute({ userId: id });
    return response.status(200).json(rentals);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      return response.status(404).json({ message: error.message });
    }
  }
}
