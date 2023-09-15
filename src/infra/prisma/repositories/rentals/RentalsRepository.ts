import { Prisma } from "@prisma/client";
import { IRentalsRepository } from "../../../../repositories/rentals/IRentalsRepository";
import { prisma } from "../../../../database";

export class RentalsRepository implements IRentalsRepository {
   async findOpenByCar(carId: string) {
      const rental = await prisma.rental.findFirst({
         where: {
            car_id: carId,
            end_date: null,
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
}
