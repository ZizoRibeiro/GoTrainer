import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

// import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordResetService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {}
}

export default ResetPasswordResetService;
