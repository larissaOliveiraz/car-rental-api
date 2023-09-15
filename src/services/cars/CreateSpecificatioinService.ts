import { SpecificationAlreadyExistsError } from "../../errors/cars/SpecificationAlreadyExistsError";
import { ISpecificationsRepository } from "../../repositories/cars/ISpecificationsRepository";

interface IRequest {
   name: string;
   description: string;
}

export class CreateSpecificationService {
   constructor(private specificationsRepository: ISpecificationsRepository) {}

   async execute({ name, description }: IRequest) {
      const specificationAlreadyExists =
         await this.specificationsRepository.findByName(name);

      if (specificationAlreadyExists) {
         throw new SpecificationAlreadyExistsError();
      }

      const specification = await this.specificationsRepository.create({
         name,
         description,
      });

      return specification;
   }
}
