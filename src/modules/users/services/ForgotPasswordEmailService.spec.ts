import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import ForgotPasswordEmail from '@modules/users/services/ForgotPasswordEmailService';

describe('ForgotPasswordEmail', () => {
  it(' should be able to recover the user password with the user email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const forgotPasswordEmail = new ForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
    );

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
});
