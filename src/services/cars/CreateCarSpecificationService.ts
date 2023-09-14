import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CarNotFoundError } from "../../errors/CarNotFoundError";
import { SpecificationNotFoundError } from "../../errors/SpecificationNotFoundError";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/cars/ISpecificationsRepository";
import { SpecificationAlreadyAddedToCarError } from "../../errors/SpecificationAlreadyAddedError";

interface IRequest {
   carId: string;
   specificationsId: string[];
}

export class CreateCarSpecificationService {
   constructor(
      private carsRepository: ICarsRepository,
      private specificationsRepository: ISpecificationsRepository
   ) {}

   async execute({ carId, specificationsId }: IRequest) {
      const car = await this.carsRepository.findById(carId);

      if (!car) {
         throw new CarNotFoundError();
      }

      for (let specificationId of specificationsId) {
         const specification = await this.specificationsRepository.findById(
            specificationId
         );

         if (!specification) {
            throw new SpecificationNotFoundError(specificationId);
         }

         try {
            const specificationsOnCar =
               await this.carsRepository.saveSpecification(
                  carId,
                  specificationId
               );
            return specificationsOnCar;
         } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
               throw new SpecificationAlreadyAddedToCarError(specificationId);
            }
         }
      }
   }
}
