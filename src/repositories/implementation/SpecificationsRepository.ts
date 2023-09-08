import { Prisma } from "@prisma/client";
import { ISpecificationsRepository } from "../ISpecificationsRepository";
import { prisma } from "../../database";

class SpecificationsRepository implements ISpecificationsRepository {
   async create(data: Prisma.SpecificationCreateInput) {
      const specification = await prisma.specification.create({
         data,
      });

      return specification;
   }

   async findByName(name: string) {
      const specification = await prisma.specification.findUnique({
         where: {
            name,
         },
      });

      return specification;
   }
}

export { SpecificationsRepository };
