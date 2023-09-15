import { compareInHours, currentDate, formatUTC } from "../../utils/dates";
import { CarNotAvailableError } from "../../errors/rentals/CarNotAvailableError";
import { UserNotAvailableError } from "../../errors/rentals/UserNotAvailableError";
import { IRentalsRepository } from "../../repositories/rentals/IRentalsRepository";
import { MinimumRentalTimeError } from "../../errors/rentals/MinimumRentalTimeError";

interface IRequest {
   userId: string;
   carId: string;
   expectedReturnDate: Date;
}

export class CreateRentalService {
   constructor(private rentalsRepository: IRentalsRepository) {}

   async execute({ userId, carId, expectedReturnDate }: IRequest) {
      const carNotAvailable = await this.rentalsRepository.findOpenByCar(carId);
      if (carNotAvailable) {
         throw new CarNotAvailableError();
      }

      const userNotAvailable = await this.rentalsRepository.findOpenByUser(
         userId
      );
      if (userNotAvailable) {
         throw new UserNotAvailableError();
      }

      const compare = compareInHours(currentDate(), expectedReturnDate);
      if (compare < 24) {
         throw new MinimumRentalTimeError();
      }

      const rental = await this.rentalsRepository.create({
         car_id: carId,
         user_id: userId,
         expected_return_date: expectedReturnDate,
      });

      return rental;
   }
}
