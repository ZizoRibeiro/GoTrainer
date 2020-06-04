import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

describe('Create User', () => {
  it(' should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'zizo ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    expect(
      createUser.execute({
        name: 'zizo ribeiro',
        email: 'zizoribeiro@example.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
