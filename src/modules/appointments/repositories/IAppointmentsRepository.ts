import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindMonthAppointmentsProviderDTO from '@modules/appointments/dtos/IFindMonthAppointmentsProviderDTO';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date): Promise<Appointment | undefined>;
  findMonthAppointmentsProvider(
    data: IFindMonthAppointmentsProviderDTO,
  ): Promise<Appointment[]>;
}
