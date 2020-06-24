// import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile info', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Zozi zozi',
      email: 'zozi@example.com',
    });

    expect(updatedUser.name).toEqual('Zozi zozi');
    expect(updatedUser.email).toEqual('zozi@example.com');
  });

  it('should not be able to update a non existent user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user',
        name: 'non-existing-user',
        email: 'not-a-user@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the email to another existed email in the app', async () => {
    await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '12312313',
    });

    const user = await fakeUsersRepository.create({
      name: 'Zizo',
      email: 'zizo@example.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Zizo Ribeiro',
        email: 'zizoribeiro@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change its own password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Zozi zozi',
      email: 'zozi@example.com',
      old_password: '123123123',
      password: '123456789',
    });

    expect(updatedUser.password).toEqual('123456789');
  });

  it('should not be able to change its own password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Zozi zozi',
        email: 'zozi@example.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change its own password without the correct old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Zizo Ribeiro',
      email: 'zizoribeiro@example.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Zozi zozi',
        email: 'zozi@example.com',
        old_password: 'wrong-password',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
