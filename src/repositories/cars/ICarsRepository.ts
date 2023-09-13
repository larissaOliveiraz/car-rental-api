import { Car, Prisma } from "@prisma/client";

export interface ICarsRepository {
   findAvailable(
      categoryId?: string,
      name?: string,
      brand?: string
   ): Promise<Car[]>;
   findByLicensePlate(licentePlate: string): Promise<Car | null>;
   create(data: Prisma.CarUncheckedCreateInput): Promise<Car>;
}
