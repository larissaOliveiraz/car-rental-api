import { Request, Response } from "express";
import { makeReturnRentalService } from "../../../services/rentals/factories/make-return-rental-service";
import { RentalNotFoundError } from "../../../errors/rentals/RentalNotFoundErrorError";
import { CarNotFoundError } from "../../../errors/cars/CarNotFoundError";

export async function returnRental(request: Request, response: Response) {
  const user = request.user;
  const rental = request.params;

  try {
    const service = makeReturnRentalService();
    await service.execute({
      rentalId: rental.id,
      userId: user.id,
    });
    return response.status(204).send();
  } catch (error) {
    if (error instanceof RentalNotFoundError) {
      return response.status(404).json({ message: error.message });
    }
    if (error instanceof CarNotFoundError) {
      return response.status(404).json({ message: error.message });
    }

    throw error;
  }
}
