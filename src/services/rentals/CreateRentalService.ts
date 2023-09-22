import { compareInHours, currentDate } from "../../utils/dates";
import { CarNotAvailableError } from "../../errors/rentals/CarNotAvailableError";
import { UserNotAvailableError } from "../../errors/rentals/UserNotAvailableError";
import { MinimumRentalTimeError } from "../../errors/rentals/MinimumRentalTimeError";
import { IRentalsRepository } from "../../repositories/rentals/IRentalsRepository";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";

interface IRequest {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

export class CreateRentalService {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private carsRepository: ICarsRepository
  ) {}

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
      user_id: userId,
      car_id: carId,
      expected_return_date: expectedReturnDate,
    });

    await this.carsRepository.updateAvailable(carId, false);

    return rental;
  }
}
