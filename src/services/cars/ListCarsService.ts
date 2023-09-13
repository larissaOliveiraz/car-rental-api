import { ICarsRepository } from "../../repositories/cars/ICarsRepository";

interface IRequest {
   categoryId?: string;
   name?: string;
   brand?: string;
}

export class ListCarsService {
   constructor(private carsRepository: ICarsRepository) {}

   async execute({ categoryId, name, brand }: IRequest) {
      const cars = this.carsRepository.findAvailable(categoryId, name, brand);

      return cars;
   }
}
