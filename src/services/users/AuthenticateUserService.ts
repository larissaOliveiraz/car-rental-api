import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "../../config/auth";
import { InvalidCredentialsError } from "../../errors/users/InvalidCredentialsError";
import { IUsersRepository } from "../../repositories/users/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/users/IUsersTokensRepository";
import { addDays } from "../../utils/dates";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordIsCorrect = await compare(password, user.password);

    if (!passwordIsCorrect) {
      throw new InvalidCredentialsError();
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refreshToken = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refreshTokenExpiresAt = addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_at: refreshTokenExpiresAt,
    });

    return {
      user,
      token,
      refreshToken,
    };
  }
}
