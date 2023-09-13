import { Prisma } from "@prisma/client";
import { ICarsRepository } from "../../../../repositories/cars/ICarsRepository";
import { prisma } from "../../../../database";

export class CarsRepository implements ICarsRepository {
   async create(data: Prisma.CarUncheckedCreateInput) {
      const car = await prisma.car.create({
         data,
      });

      return car;
   }

   async findByLicensePlate(licentePlate: string) {
      const car = await prisma.car.findFirst({
         where: {
            license_plate: licentePlate,
         },
      });

      return car ? car : null;
   }
}
