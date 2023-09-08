import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { categoryRoutes } from "./http/routes/categories.routes";
import { specificationRoutes } from "./http/routes/specifications.routes";
import { userRoutes } from "./http/routes/users.routes";
import { authenticationRoutes } from "./http/routes/authentication.routes";

export const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use("/categories", categoryRoutes);
app.use("/specifications", specificationRoutes);
app.use("/users", userRoutes);
app.use(authenticationRoutes);
