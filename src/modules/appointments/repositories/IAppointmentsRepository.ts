import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindMonthAppointmentsProviderDTO from '@modules/appointments/dtos/IFindMonthAppointmentsProviderDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityProviderDTO from '@modules/appointments/dtos/IFindDailyAvailabilityProvidderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findMonthAppointmentsProvider(
    data: IFindMonthAppointmentsProviderDTO,
  ): Promise<Appointment[]>;
  findDailyAvailabilityProvider(
    data: IFindDailyAvailabilityProviderDTO,
  ): Promise<Appointment[]>;
}
