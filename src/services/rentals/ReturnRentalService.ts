import { CarNotFoundError } from "../../errors/cars/CarNotFoundError";
import { RentalNotFoundError } from "../../errors/rentals/RentalNotFoundErrorError";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { IRentalsRepository } from "../../repositories/rentals/IRentalsRepository";
import { compareInDays, compareInHours, currentDate } from "../../utils/dates";

interface IRequest {
  rentalId: string;
  userId: string;
}

export class ReturnRentalService {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private carsRepository: ICarsRepository
  ) {}

  async execute({ rentalId, userId }: IRequest) {
    const rental = await this.rentalsRepository.findById(rentalId);
    if (!rental) {
      throw new RentalNotFoundError();
    }

    const car = await this.carsRepository.findById(rental.car_id);
    if (!car) {
      throw new CarNotFoundError();
    }

    let daily = compareInDays(rental.start_date, currentDate());
    if (daily <= 0) {
      daily = 1;
    }

    let fine_amount = 0

    const delay = compareInHours(rental.expected_return_date, currentDate());
    if (delay > 0) {
      fine_amount = car.fine_amount * delay;      
    }

    const total = (daily * car.daily_rate) + fine_amount

    const rentalReturned = await this.rentalsRepository.returnRental(
      rentalId,
      total
    );

    await this.carsRepository.updateAvailable(rental.car_id, true);

    return rentalReturned;
  }
}
