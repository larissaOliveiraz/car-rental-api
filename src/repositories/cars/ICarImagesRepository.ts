import { CarImage, Prisma } from "@prisma/client";

export interface ICarsImagesRepository {
   create(data: Prisma.CarImageUncheckedCreateInput): Promise<CarImage>;
}
