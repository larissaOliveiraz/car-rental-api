import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
   sub: string;
}

export async function verifyAuthentication(
   request: Request,
   response: Response,
   next: NextFunction
) {
   const auth = request.headers.authorization;

   if (!auth) {
      throw new Error("Token missing.");
   }

   const [_, token] = auth.split(" ");

   try {
      const { sub } = verify(
         token,
         "d04e45099b5a1ef42dda18aae6e5d96f"
      ) as IPayload;

      next();
   } catch (error) {
      throw new Error("Invalid token.");
   }
}
