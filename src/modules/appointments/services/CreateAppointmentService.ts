import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentServices {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findSameDateAppointment = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findSameDateAppointment) {
      throw new AppError('Sorry! Professional cannot be booked at this time');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
