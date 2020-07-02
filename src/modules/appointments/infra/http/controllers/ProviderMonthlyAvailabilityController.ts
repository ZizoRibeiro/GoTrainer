import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthlyAvailabilityService from '@modules/appointments/services/ListProviderMonthlyAvailabilityService';

export default class ProviderMonthlyAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProviderMonthlyAvailability = container.resolve(
      ListProviderMonthlyAvailabilityService,
    );

    const availability = await listProviderMonthlyAvailability.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
