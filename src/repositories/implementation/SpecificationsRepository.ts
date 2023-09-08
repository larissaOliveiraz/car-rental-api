import {
   ICreateSpecificationDTO,
   ISpecificationsRepository,
} from "../ISpecificationsRepository";

// class SpecificationsRepository implements ISpecificationsRepository {
//    private specifications: Specification[] = [];

//    create({ name, description }: ICreateSpecificationDTO) {
//       const specification = new Specification();

//       Object.assign(specification, {
//          name,
//          description,
//          created_at: new Date(),
//       });

//       this.specifications.push(specification);
//    }

//    findByName(name: string) {
//       return this.specifications.find((item) => item.name === name);
//    }
// }

// export { SpecificationsRepository };
