import { Request, Response } from "express";
import { makeCreateRentalService } from "../../../services/rentals/factories/make-create-rental-service";
import { CarNotAvailableError } from "../../../errors/rentals/CarNotAvailableError";
import { UserNotAvailableError } from "../../../errors/rentals/UserNotAvailableError";
import { MinimumRentalTimeError } from "../../../errors/rentals/MinimumRentalTimeError";

export async function createRental(request: Request, response: Response) {
   const { carId, expectedReturnDate } = request.body;
   const { id } = request.user;

   try {
      const service = makeCreateRentalService();
      await service.execute({
         carId,
         userId: id,
         expectedReturnDate,
      });
      return response.status(201).send();
   } catch (error) {
      if (error instanceof CarNotAvailableError) {
         return response.status(400).json({ message: error.message });
      }
      if (error instanceof UserNotAvailableError) {
         return response.status(400).json({ message: error.message });
      }
      if (error instanceof MinimumRentalTimeError) {
         return response.status(400).json({ message: error.message });
      }

      throw error;
   }
}
