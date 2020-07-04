import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderDailyAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDailyAvailabilityController';
import ProviderMonthlyAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthlyAvailabilityController';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();
const providerMonthlyAvailabilityController = new ProviderMonthlyAvailabilityController();
const providerDailyAvailabilityController = new ProviderDailyAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/monthly-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthlyAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/daily-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDailyAvailabilityController.index,
);

export default providersRouter;
