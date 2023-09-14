import { CarImagesRepository } from "../../../infra/prisma/repositories/cars/CarImagesRepository";
import { CarsRepository } from "../../../infra/prisma/repositories/cars/CarsRepository";
import { UploadCarImageService } from "../UploadCarImageService";

export function makeUploadCarImagesService() {
   const carImagesRepository = new CarImagesRepository();
   const carsRepository = new CarsRepository();
   const service = new UploadCarImageService(
      carImagesRepository,
      carsRepository
   );

   return service;
}
