import { NextFunction, Request, Response } from "express";
import { TokenExpiredError, verify } from "jsonwebtoken";
import authParams from "../../config/auth";
import { InvalidTokenError } from "../../errors/users/InvalidTokenError";
import { TokenMissingError } from "../../errors/users/TokenMissingError";
import { makeGetUserProfileService } from "../../services/users/factories/make-get-user-profile-service";
import { UsersTokensRepository } from "../../infra/prisma/repositories/users/UsersTokensRepository";

interface IPayload {
  sub: string;
}

export async function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const auth = request.headers.authorization;
  const usersTokensRepository = new UsersTokensRepository();

  try {
    if (!auth) {
      response.status(401).json({ message: "Token missing." });
      throw new TokenMissingError();
    }

    const [_, token] = auth.split(" ");

    const { sub } = verify(token, authParams.secret_refresh_token) as IPayload;

    const user = await usersTokensRepository.findByUserAndRefreshToken(
      sub,
      token
    );

    if (!user) {
      throw new InvalidTokenError();
    }

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return response.status(401).json({ message: error.message });
    }
    if (error instanceof TokenExpiredError) {
      return response.status(401).json({ message: "JWT expired." });
    }

    throw error;
  }
}
