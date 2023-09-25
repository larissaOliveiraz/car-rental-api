import { Request, Response } from "express";
import { makeRefreshTokenService } from "../../../services/users/factories/make-refresh-token-service";
import { RefreshTokenNotFoundError } from "../../../errors/users/RefreshTokenNotFoundError";

export async function refreshToken(request: Request, response: Response) {
  const token =
    request.body.token ||
    request.headers["x-access-token"] ||
    request.query.token;

  try {
    const service = makeRefreshTokenService();
    const refreshToken = await service.execute(token);
    return response.status(201).json({ refreshToken });
  } catch (error) {
    if (error instanceof RefreshTokenNotFoundError) {
      return response.status(400).json({ message: error.message });
    }
  }
}
