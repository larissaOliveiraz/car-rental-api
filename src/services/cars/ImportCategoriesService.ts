import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/cars/ICategoriesRepository";

interface IImportCategories {
   name: string;
   description: string;
}

export class ImportCategoriesService {
   constructor(private categoriesRepository: ICategoriesRepository) {}

   loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
      return new Promise((resolve, reject) => {
         const stream = fs.createReadStream(file.path);
         const categories: IImportCategories[] = [];

         const parseFile = parse();

         stream.pipe(parseFile);

         parseFile
            .on("data", async (line) => {
               const [name, description] = line;

               categories.push({ name, description });
            })
            .on("end", () => {
               fs.promises.unlink(file.path);
               resolve(categories);
            })
            .on("error", (error) => {
               reject(error);
            });
      });
   }

   async execute(file: Express.Multer.File) {
      const categories: IImportCategories[] = await this.loadCategories(file);

      categories.map(async (category) => {
         const { name, description } = category;

         const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);

         if (!categoryAlreadyExists) {
            await this.categoriesRepository.create({
               name,
               description,
            });
         }
      });
   }
}
