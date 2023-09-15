import { Prisma, Rental } from "@prisma/client";

export interface IRentalsRepository {
   findOpenByCar(carId: string): Promise<Rental | null>;
   findOpenByUser(userId: string): Promise<Rental | null>;
   create(data: Prisma.RentalUncheckedCreateInput): Promise<Rental>;
}
