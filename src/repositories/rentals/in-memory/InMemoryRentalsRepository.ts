import { Prisma, Rental } from "@prisma/client";
import { IRentalsRepository } from "../IRentalsRepository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findById(rentalId: string) {
    const rental = this.rentals.find((item) => item.id === rentalId);

    return rental ? rental : null;
  }

  async findOpenByCar(carId: string) {
    const rental = this.rentals.find(
      (item) => item.car_id === carId && !item.end_date
    );

    return rental ? rental : null;
  }

  async findOpenByUser(userId: string) {
    const rental = this.rentals.find(
      (item) => item.user_id === userId && !item.end_date
    );

    return rental ? rental : null;
  }

  async findManyByUser(userId: string) {
    const rentals = this.rentals.filter((item) => item.user_id === userId);

    return rentals;
  }

  async create(data: Prisma.RentalUncheckedCreateInput) {
    const rental: Rental = {
      id: data.id ? data.id : randomUUID(),
      car_id: data.car_id,
      user_id: data.user_id,
      start_date: new Date(),
      end_date: data.end_date as Date,
      expected_return_date: data.expected_return_date as Date,
      total: data.total as Decimal,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.rentals.push(rental);

    return rental;
  }

  async returnRental(rentalId: string, total: number) {
    const rentalIndex = this.rentals.findIndex((item) => item.id === rentalId);

    this.rentals[rentalIndex].end_date = new Date();
    this.rentals[rentalIndex].total = new Decimal(total);

    return this.rentals[rentalIndex];
  }
}
