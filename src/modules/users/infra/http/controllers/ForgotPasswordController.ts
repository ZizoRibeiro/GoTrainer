import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordEmailService = container.resolve(
      ForgotPasswordEmailService,
    );

    await forgotPasswordEmailService.execute({
      email,
    });

    return response.status(204).json();
  }
}
