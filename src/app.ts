import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { categoryRoutes } from "./http/routes/categories.routes";
import { specificationRoutes } from "./http/routes/specifications.routes";
import { userRoutes } from "./http/routes/users.routes";
import { authenticationRoutes } from "./http/routes/authentication.routes";
import { AppError } from "./errors/AppError";
import { carRoutes } from "./http/routes/cars.routes";

export const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/cars", carRoutes);
app.use("/categories", categoryRoutes);
app.use("/specifications", specificationRoutes);
app.use("/users", userRoutes);
app.use(authenticationRoutes);

app.use(
   (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
         return response
            .status(error.statusCode)
            .json({ message: error.message });
      }

      return response
         .status(500)
         .json({ message: `Internal Server Error - ${error.message}` });
   }
);
