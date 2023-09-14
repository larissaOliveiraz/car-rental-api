import { CarNotFoundError } from "../../errors/CarNotFoundError";
import { SpecificationNotFoundError } from "../../errors/SpecificationNotFoundError";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/cars/ISpecificationsRepository";

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

      for (let id of specificationsId) {
         const specification = await this.specificationsRepository.findById(id);

         if (!specification) {
            throw new SpecificationNotFoundError(id);
         }
      }

      const specificationsOnCar = await this.carsRepository.saveSpecifications(
         carId,
         specificationsId
      );

      return specificationsOnCar;
   }
}
