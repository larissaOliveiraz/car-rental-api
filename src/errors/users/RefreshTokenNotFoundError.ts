import { AppError } from "../AppError";

export class RefreshTokenNotFoundError extends AppError {
  constructor() {
    super("Refresh token not found.", 401);
  }
}
