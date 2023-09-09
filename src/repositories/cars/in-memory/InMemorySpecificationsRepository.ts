import { Prisma, Specification } from "@prisma/client";
import { ISpecificationsRepository } from "../ISpecificationsRepository";
import { randomUUID } from "node:crypto";

export class InMemorySpecificationsRepository
   implements ISpecificationsRepository
{
   public specifications: Specification[] = [];

   async create(data: Prisma.SpecificationCreateInput) {
      const specification = {
         id: randomUUID(),
         name: data.name,
         description: data.description,
         created_at: new Date(),
      };

      this.specifications.push(specification);

      return specification;
   }

   async findByName(name: string) {
      const specification = this.specifications.find(
         (item) => item.name === name
      );

      return specification;
   }
}
