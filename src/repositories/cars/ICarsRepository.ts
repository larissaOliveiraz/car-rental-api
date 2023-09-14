import { Car, Prisma, Specification } from "@prisma/client";

export interface ICarsRepository {
   findAvailable(
      categoryId?: string,
      name?: string,
      brand?: string
   ): Promise<Car[]>;
   findById(carId: string): Promise<Car | null>;
   findByLicensePlate(licentePlate: string): Promise<Car | null>;
   saveSpecifications(carId: string, specificationsId: string[]): Promise<Car>;
   create(data: Prisma.CarUncheckedCreateInput): Promise<Car>;
}
