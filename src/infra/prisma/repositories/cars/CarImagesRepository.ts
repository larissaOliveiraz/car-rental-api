import { Prisma } from "@prisma/client";
import { ICarsImagesRepository } from "../../../../repositories/cars/ICarImagesRepository";
import { prisma } from "../../../../database";

export class CarImagesRepository implements ICarsImagesRepository {
   async create(data: Prisma.CarImageUncheckedCreateInput) {
      const carImage = await prisma.carImage.create({
         data,
      });

      return carImage;
   }
}
