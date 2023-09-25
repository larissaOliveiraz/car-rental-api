import { sign, verify } from "jsonwebtoken";
import { IUsersTokensRepository } from "../../repositories/users/IUsersTokensRepository";
import auth from "../../config/auth";
import { RefreshTokenNotFoundError } from "../../errors/users/RefreshTokenNotFoundError";
import { addDays } from "../../utils/dates";

interface IPayload {
  sub: string;
  email: string;
}

export class RefreshTokenService {
  constructor(private usersTokensRepository: IUsersTokensRepository) {}

  async execute(token: string) {
    const { sub, email } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserAndRefreshToken(sub, token);
    if (!userToken) {
      throw new RefreshTokenNotFoundError();
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refreshTokenExpiresAt = addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: sub,
      refresh_token: refreshToken,
      expires_at: refreshTokenExpiresAt,
    });

    return refreshToken;
  }
}
