import { randomUUID } from "crypto";
import { Car, Prisma } from "@prisma/client";
import { ICarsRepository } from "../ICarsRepository";

export class InMemoryCarsRepository implements ICarsRepository {
   private cars: Car[] = [];

   async create(data: Prisma.CarUncheckedCreateInput) {
      const car: Car = {
         id: randomUUID(),
         category_id: data.category_id,
         name: data.name,
         description: data.description,
         brand: data.brand,
         available: data.available ? data.available : true,
         daily_rate: data.daily_rate,
         fine_amount: data.fine_amount,
         license_plate: data.license_plate,
         created_at: new Date(),
      };

      this.cars.push(car);

      return car;
   }

   async findByLicensePlate(licentePlate: string) {
      const car = this.cars.find((item) => item.license_plate === licentePlate);

      return car ? car : null;
   }
}
