import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Invalid Email or Password, please try again.');
    }

    const passwordChecked = await compare(password, user.password);

    if (!passwordChecked) {
      throw new Error('Invalid Email or Password, please try again.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserService;
