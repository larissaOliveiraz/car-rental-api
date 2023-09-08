import { Request, Response } from "express";
import { ImportCategoriesUseCase } from "../../../../services/ImportCategoriesService";

class ImportCategoriesController {
   constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

   handle(request: Request, response: Response) {
      const { file } = request;

      this.importCategoriesUseCase.execute(file);

      return response.send();
   }
}

export { ImportCategoriesController };
