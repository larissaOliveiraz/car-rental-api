import { Prisma, Specification } from "@prisma/client";

interface ISpecificationsRepository {
   create({
      name,
      description,
   }: Prisma.SpecificationCreateInput): Promise<Specification>;
   findByName(name: string): Promise<Specification | null>;
}

export { ISpecificationsRepository };
