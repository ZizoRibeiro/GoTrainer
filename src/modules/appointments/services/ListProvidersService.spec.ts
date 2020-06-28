// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('List Providers Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Zizo2',
      email: 'zizo2@example.com',
      password: '123123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Zizo3',
      email: 'zizo3@example.com',
      password: '123123123',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
