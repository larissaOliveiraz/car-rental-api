import { Car, Prisma } from "@prisma/client";

export interface ICarsRepository {
   create(data: Prisma.CarUncheckedCreateInput): Promise<Car>;
   findByLicensePlate(licentePlate: string): Promise<Car | null>;
}
