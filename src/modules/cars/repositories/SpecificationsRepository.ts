import { Specification } from "../model/Specification";
import {
   ICreateSpecificationDTO,
   ISpecificationsRepository,
} from "./interfaces/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
   private specifications: Specification[];

   private static INSTANCE: SpecificationsRepository;

   private constructor() {
      this.specifications = [];
   }

   public static getInstance(): SpecificationsRepository {
      if (!SpecificationsRepository.INSTANCE) {
         SpecificationsRepository.INSTANCE = new SpecificationsRepository();
      }
      return SpecificationsRepository.INSTANCE;
   }

   create({ name, description }: ICreateSpecificationDTO) {
      const specification = new Specification();

      Object.assign(specification, {
         name,
         description,
         created_at: new Date(),
      });

      this.specifications.push(specification);
   }

   findByName(name: string) {
      return this.specifications.find((item) => item.name === name);
   }
}

export { SpecificationsRepository };
