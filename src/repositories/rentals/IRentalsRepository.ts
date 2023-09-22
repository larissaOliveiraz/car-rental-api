import { Prisma, Rental } from "@prisma/client";

export interface IRentalsRepository {
  findById(rentalId: string): Promise<Rental | null>;
  findOpenByCar(carId: string): Promise<Rental | null>;
  findOpenByUser(userId: string): Promise<Rental | null>;
  create(data: Prisma.RentalUncheckedCreateInput): Promise<Rental>;
  returnRental(rentalId: string, total: number): Promise<Rental>;
}
