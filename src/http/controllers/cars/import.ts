import { Request, Response } from "express";
import { makeImportCategoriesService } from "../../../services/factory/make-import-categories-service";

export async function importCategories(request: Request, response: Response) {
   const { file } = request;

   const service = makeImportCategoriesService();
   await service.execute(file);

   return response.send();
}
