import { Prisma, Specification } from "@prisma/client";

interface ISpecificationsRepository {
   findByName(name: string): Promise<Specification | null>;
   findById(id: string): Promise<Specification | null>;
   create({
      name,
      description,
   }: Prisma.SpecificationCreateInput): Promise<Specification>;
}

export { ISpecificationsRepository };
