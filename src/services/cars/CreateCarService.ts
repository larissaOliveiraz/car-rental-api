import { CarAlreadyExistsError } from "../../errors/cars/CarAlreadyExistsError";
import { ICarsRepository } from "../../repositories/cars/ICarsRepository";

interface IRequest {
   name: string;
   category_id: string;
   description: string;
   brand: string;
   daily_rate: number;
   fine_amount: number;
   license_plate: string;
}

export class CreateCarService {
   constructor(private carsRepository: ICarsRepository) {}

   async execute({
      name,
      category_id,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
   }: IRequest) {
      const carAlreadyExists = await this.carsRepository.findByLicensePlate(
         license_plate
      );

      if (carAlreadyExists) {
         throw new CarAlreadyExistsError();
      }

      const car = await this.carsRepository.create({
         name,
         category_id,
         description,
         brand,
         daily_rate,
         fine_amount,
         license_plate,
      });

      return car;
   }
}
