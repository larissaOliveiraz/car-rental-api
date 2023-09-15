import { Request, Response } from "express";
import { makeUploadCarImagesService } from "../../../services/cars/factories/make-upload-car-images-service";
import { CarNotFoundError } from "../../../errors/cars/CarNotFoundError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

interface IFile {
   filename: string;
}

export async function uploadCarImages(request: Request, response: Response) {
   const { id } = request.params;
   const imageFiles = request.files as IFile[];

   try {
      const images = imageFiles.map((file) => file.filename);

      const service = makeUploadCarImagesService();
      await service.execute({ carId: id, images });

      return response.status(201).send();
   } catch (error) {
      if (error instanceof CarNotFoundError) {
         return response.status(404).json({ message: error.message });
      }
      throw error;
   }
}
