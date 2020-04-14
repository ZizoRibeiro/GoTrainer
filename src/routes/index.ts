import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Server is UP and Running!' }),
);

export default routes;
