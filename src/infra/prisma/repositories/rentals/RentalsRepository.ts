import { Prisma } from "@prisma/client";
import { IRentalsRepository } from "../../../../repositories/rentals/IRentalsRepository";
import { prisma } from "../../../../database";
import { currentDate } from "../../../../utils/dates";
import { Decimal } from "@prisma/client/runtime/library";

export class RentalsRepository implements IRentalsRepository {
  async findById(rentalId: string) {
    const rental = await prisma.rental.findUnique({
      where: {
        id: rentalId,
      },
    });

    return rental ? rental : null;
  }

  async findOpenByCar(carId: string) {
    const rental = await prisma.rental.findFirst({
      where: {
        AND: [{ car_id: carId }, { end_date: null }],
      },
    });

    return rental ? rental : null;
  }

  async findOpenByUser(userId: string) {
    const rental = await prisma.rental.findFirst({
      where: {
        user_id: userId,
        end_date: null,
      },
    });

    return rental ? rental : null;
  }

  async create(data: Prisma.RentalUncheckedCreateInput) {
    const rental = await prisma.rental.create({
      data,
    });

    return rental;
  }

  async returnRental(rentalId: string, total: number) {
    const rental = await prisma.rental.update({
      where: {
        id: rentalId,
      },
      data: {
        end_date: currentDate(),
        total: new Prisma.Decimal(total.toFixed(1)),
      },
    });

    console.log(rental);

    return rental;
  }
}
