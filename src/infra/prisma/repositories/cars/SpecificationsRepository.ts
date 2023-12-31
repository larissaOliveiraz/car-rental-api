import { Prisma, Specification } from "@prisma/client";
import { prisma } from "../../../../database";
import { ISpecificationsRepository } from "../../../../repositories/cars/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
   async findById(id: string) {
      const specification = await prisma.specification.findUnique({
         where: {
            id,
         },
      });

      return specification ? specification : null;
   }

   async findByName(name: string) {
      const specification = await prisma.specification.findUnique({
         where: {
            name,
         },
      });

      return specification ? specification : null;
   }

   async create(data: Prisma.SpecificationCreateInput) {
      const specification = await prisma.specification.create({
         data,
      });

      return specification;
   }
}

export { SpecificationsRepository };
