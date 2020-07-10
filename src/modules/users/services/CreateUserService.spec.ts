import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it(' should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'zizo ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    await expect(
      createUser.execute({
        name: 'zizo ribeiro',
        email: 'zizoribeiro@example.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
