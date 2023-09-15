import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CarNotFoundError } from "../../errors/cars/CarNotFoundError";
import { ICarsImagesRepository } from "../../repositories/cars/ICarImagesRepository";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { deleteAllFiles } from "../../utils/file";

interface IRequest {
   carId: string;
   images: string[];
}

export class UploadCarImageService {
   constructor(
      private carImagesRepository: ICarsImagesRepository,
      private carsRepository: ICarsRepository
   ) {}

   async execute({ carId, images }: IRequest) {
      const car = await this.carsRepository.findById(carId);
      if (!car) {
         throw new CarNotFoundError();
      }

      const carImages = images.map(async (image) => {
         return await this.carImagesRepository.create({
            car_id: carId,
            image_name: image,
         });
      });

      deleteAllFiles("./tmp/cars");

      return carImages;
   }
}
