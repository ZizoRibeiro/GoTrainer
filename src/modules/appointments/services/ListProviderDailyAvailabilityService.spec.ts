// import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDailyAvailabilityService from '@modules/appointments/services/ListProviderDailyAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDailyAvailability: ListProviderDailyAvailabilityService;

describe('List Providers Service', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDailyAvailability = new ListProviderDailyAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider day availability time', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDailyAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
