import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let forgotPasswordEmail: ForgotPasswordEmailService;

describe('ForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    forgotPasswordEmail = new ForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it(' should be able to recover the user password with the user email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'zizo ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    await forgotPasswordEmail.execute({
      email: 'zizoribeiro@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a password from a non-user', async () => {
    await expect(
      forgotPasswordEmail.execute({
        email: 'zizoribeiro@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a user token using the forgot password email', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'zizo ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    await forgotPasswordEmail.execute({
      email: 'zizoribeiro@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
