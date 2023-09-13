import { Prisma } from "@prisma/client";
import { ICarsRepository } from "../../../../repositories/cars/ICarsRepository";
import { prisma } from "../../../../database";

export class CarsRepository implements ICarsRepository {
   async findAvailable(categoryId?: string, name?: string, brand?: string) {
      const cars = await prisma.car.findMany({
         where: {
            available: true,
         },
      });

      if (categoryId || name || brand) {
         const carsFiltered = await prisma.car.findMany({
            where: {
               available: true,
               category_id: categoryId && categoryId,
               name: name && name,
               brand: brand && brand,
            },
         });

         return carsFiltered;
      }

      return cars;
   }

   async findByLicensePlate(licentePlate: string) {
      const car = await prisma.car.findFirst({
         where: {
            license_plate: licentePlate,
         },
      });

      return car ? car : null;
   }

   async create(data: Prisma.CarUncheckedCreateInput) {
      const car = await prisma.car.create({
         data,
      });

      return car;
   }
}
